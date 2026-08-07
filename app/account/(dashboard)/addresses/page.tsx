import type { Metadata } from "next";
import { AddressManager } from "@/components/account/address-manager";

export const metadata: Metadata = { title: "Addresses", robots: { index: false } };

export default function AddressesPage() {
  return <AddressManager />;
}
