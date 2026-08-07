import type { Metadata } from "next";
import { ProductForm } from "@/components/admin/product-form";

export const metadata: Metadata = { title: "New Product", robots: { index: false } };

export default function NewProductPage() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-ink">New Product</h2>
      <div className="mt-6">
        <ProductForm />
      </div>
    </div>
  );
}
