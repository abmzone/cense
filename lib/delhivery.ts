const BASE_URL = "https://track.delhivery.com";

interface DelhiveryConsignee {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface CreateShipmentParams {
  orderNumber: string;
  consignee: DelhiveryConsignee;
  paymentMode: "COD" | "Prepaid";
  codAmount: number; // rupees
  totalAmount: number; // rupees
  weightGrams: number;
  quantity: number;
}

interface DelhiveryPackageResult {
  waybill: string | null;
  status: string;
  remarks: string[];
}

export interface CreateShipmentResult {
  ok: boolean;
  waybill: string | null;
  raw: unknown;
  error?: string;
}

function authHeaders() {
  return {
    Authorization: `Token ${process.env.DELHIVERY_API_TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

/**
 * Creates a forward shipment via Delhivery's Order Creation (cmu/create) API
 * and returns the assigned waybill number.
 *
 * Delhivery's public docs are sparse and response shapes have been observed
 * to vary slightly by account — this parses the commonly-documented
 * `{ packages: [{ waybill, status, remarks }] }` shape and surfaces the raw
 * response either way so failures are debuggable from the admin UI.
 */
export async function createShipment(
  params: CreateShipmentParams
): Promise<CreateShipmentResult> {
  const pickupName = process.env.DELHIVERY_PICKUP_LOCATION!;
  const pickupAddress = process.env.DELHIVERY_PICKUP_ADDRESS ?? "";
  const pickupCity = process.env.DELHIVERY_PICKUP_CITY ?? "";
  const pickupPincode = process.env.DELHIVERY_PICKUP_PINCODE ?? "";
  const pickupPhone = process.env.DELHIVERY_PICKUP_PHONE ?? "";
  const sellerName = process.env.DELHIVERY_CLIENT_NAME!;
  const hsnCode = process.env.DELHIVERY_HSN_CODE ?? "33074100";
  const sellerGstTin = process.env.DELHIVERY_SELLER_GST_TIN ?? "";

  const shipment = {
    name: params.consignee.name,
    add: params.consignee.address,
    pin: params.consignee.pincode,
    city: params.consignee.city,
    state: params.consignee.state,
    country: "India",
    phone: params.consignee.phone,
    order: params.orderNumber,
    payment_mode: params.paymentMode,
    products_desc: "Handcrafted incense sticks",
    hsn_code: hsnCode,
    cod_amount: params.paymentMode === "COD" ? params.codAmount : 0,
    total_amount: params.totalAmount,
    seller_add: pickupAddress,
    seller_name: sellerName,
    seller_gst_tin: sellerGstTin,
    quantity: params.quantity,
    waybill: "",
    shipment_width: "10",
    shipment_height: "10",
    weight: params.weightGrams,
    shipping_mode: "Surface",
    address_type: "home",
  };

  const payload = {
    shipments: [shipment],
    pickup_location: {
      name: pickupName,
      add: pickupAddress,
      city: pickupCity,
      pin_code: pickupPincode,
      country: "India",
      phone: pickupPhone,
    },
  };

  const body = `format=json&data=${encodeURIComponent(JSON.stringify(payload))}`;

  const res = await fetch(`${BASE_URL}/api/cmu/create.json`, {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const raw = await res.json().catch(() => null);

  if (!res.ok || !raw) {
    return { ok: false, waybill: null, raw, error: `Delhivery API error (${res.status})` };
  }

  const pkg: DelhiveryPackageResult | undefined = raw?.packages?.[0];
  if (!pkg || pkg.status !== "Success") {
    return {
      ok: false,
      waybill: null,
      raw,
      error: pkg?.remarks?.join(", ") || "Shipment creation was not successful",
    };
  }

  return { ok: true, waybill: pkg.waybill, raw };
}

export interface ShippingRateResult {
  ok: boolean;
  amountPaise: number | null;
  raw: unknown;
}

/**
 * Looks up an estimated freight charge for a shipment via Delhivery's
 * Invoice/Shipping Charge API. Delhivery's own docs note the returned
 * `total_amount` is approximate and the amount actually billed can differ —
 * this is used to give customers a realistic pincode-based shipping
 * estimate at checkout, not as a billing-grade quote.
 *
 * Surface-only ("md=S") per the delivery profile for a light, non-urgent
 * product like incense.
 */
export async function getShippingRate(params: {
  destinationPincode: string;
  weightGrams: number;
  paymentMode: "Prepaid" | "COD";
}): Promise<ShippingRateResult> {
  const originPincode = process.env.DELHIVERY_PICKUP_PINCODE ?? "";
  const clientName = process.env.DELHIVERY_CLIENT_NAME ?? "";

  const query = new URLSearchParams({
    md: "S",
    cgm: String(Math.max(1, Math.round(params.weightGrams))),
    o_pin: originPincode,
    d_pin: params.destinationPincode,
    ss: "Delivered",
    pt: params.paymentMode === "COD" ? "COD" : "Pre-paid",
    cl: clientName,
  });

  try {
    const res = await fetch(
      `${BASE_URL}/api/kinko/v1/invoice/charges/.json?${query.toString()}`,
      { headers: authHeaders() }
    );
    const raw = await res.json().catch(() => null);

    if (!res.ok || !raw) return { ok: false, amountPaise: null, raw };

    // Response shape has been reported to vary by account — commonly an
    // array with a `total_amount` field on the first element.
    const entry = Array.isArray(raw) ? raw[0] : raw;
    const amountRupees = entry?.total_amount ?? entry?.charge_DL ?? null;

    if (amountRupees == null || Number.isNaN(Number(amountRupees))) {
      return { ok: false, amountPaise: null, raw };
    }

    return { ok: true, amountPaise: Math.round(Number(amountRupees) * 100), raw };
  } catch (err) {
    return { ok: false, amountPaise: null, raw: err instanceof Error ? err.message : err };
  }
}

/**
 * Fetches the packing slip / shipping label for a waybill. Delhivery's docs
 * describe this as returning JSON to be rendered into a label layout rather
 * than a direct PDF — this returns that raw JSON so the caller can render or
 * link to whatever the account's response actually contains (a
 * `pdf_download_link` field has been commonly reported for accounts with PDF
 * output enabled).
 */
export async function getShippingLabel(waybill: string) {
  const res = await fetch(
    `${BASE_URL}/api/p/packing_slip?wbns=${encodeURIComponent(waybill)}&pdf=true`,
    { headers: authHeaders() }
  );

  const raw = await res.json().catch(() => null);
  return { ok: res.ok, raw };
}
