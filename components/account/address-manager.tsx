"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import type { Address } from "@/lib/types";

const EMPTY_FORM = {
  full_name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "India",
  is_default: false,
};

export function AddressManager() {
  const supabase = createClient();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function refresh() {
    const { data } = await supabase
      .from("addresses")
      .select("*")
      .order("is_default", { ascending: false });
    setAddresses((data as Address[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    if (editingId) {
      await supabase.from("addresses").update(form).eq("id", editingId);
    } else {
      await supabase.from("addresses").insert({ ...form, user_id: user.id });
    }
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
    refresh();
  }

  async function onDelete(id: string) {
    await supabase.from("addresses").delete().eq("id", id);
    refresh();
  }

  function onEdit(address: Address) {
    setForm({
      full_name: address.full_name,
      phone: address.phone,
      line1: address.line1,
      line2: address.line2 ?? "",
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default,
    });
    setEditingId(address.id);
    setShowForm(true);
  }

  if (loading) return null;

  return (
    <div className="space-y-8">
      {addresses.length === 0 && !showForm && (
        <p className="text-sm text-ink-soft">You don&apos;t have any saved addresses yet.</p>
      )}

      <ul className="space-y-4">
        {addresses.map((address) => (
          <li key={address.id} className="border border-line p-5 text-sm">
            <p className="text-ink">{address.full_name}</p>
            <p className="text-ink-soft">
              {address.line1}
              {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state}{" "}
              {address.postal_code}
            </p>
            <p className="text-ink-soft">{address.phone}</p>
            <div className="mt-3 flex gap-4 text-xs">
              <button onClick={() => onEdit(address)} className="underline underline-offset-4 hover:text-maroon">
                Edit
              </button>
              <button onClick={() => onDelete(address.id)} className="underline underline-offset-4 hover:text-maroon">
                Delete
              </button>
              {address.is_default && <span className="text-terracotta">Default</span>}
            </div>
          </li>
        ))}
      </ul>

      {showForm ? (
        <form onSubmit={onSubmit} className="grid gap-4 border border-line p-6 md:grid-cols-2">
          <input
            required
            placeholder="Full name"
            value={form.full_name}
            onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          />
          <input
            required
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          />
          <input
            required
            placeholder="Address line 1"
            value={form.line1}
            onChange={(e) => setForm((f) => ({ ...f, line1: e.target.value }))}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none md:col-span-2"
          />
          <input
            placeholder="Address line 2"
            value={form.line2}
            onChange={(e) => setForm((f) => ({ ...f, line2: e.target.value }))}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none md:col-span-2"
          />
          <input
            required
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          />
          <input
            required
            placeholder="State"
            value={form.state}
            onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          />
          <input
            required
            placeholder="Postal code"
            value={form.postal_code}
            onChange={(e) => setForm((f) => ({ ...f, postal_code: e.target.value }))}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          />
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={form.is_default}
              onChange={(e) => setForm((f) => ({ ...f, is_default: e.target.checked }))}
            />
            Set as default
          </label>
          <div className="flex gap-3 md:col-span-2">
            <Button type="submit">{editingId ? "Save Address" : "Add Address"}</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setForm(EMPTY_FORM);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Button type="button" variant="secondary" onClick={() => setShowForm(true)}>
          Add New Address
        </Button>
      )}
    </div>
  );
}
