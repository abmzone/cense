"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import type { Product, ProductImage, ProductVariant } from "@/lib/types";

type VariantDraft = Partial<ProductVariant> & {
  label: string;
  weight_grams: number;
  burn_time_minutes: number;
  price: number;
  compare_at_price: number | null;
  stock: number;
  sku: string;
};

type ImageDraft = Partial<ProductImage> & { url: string; alt: string; position: number };

const EMPTY_VARIANT: VariantDraft = {
  label: "",
  weight_grams: 40,
  burn_time_minutes: 45,
  price: 0,
  compare_at_price: null,
  stock: 0,
  sku: "",
};

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const supabase = createClient();
  const isEdit = Boolean(product);

  const [slug, setSlug] = useState(product?.slug ?? "");
  const [name, setName] = useState(product?.name ?? "");
  const [tagline, setTagline] = useState(product?.tagline ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [story, setStory] = useState(product?.story ?? "");
  const [fragranceNotes, setFragranceNotes] = useState(
    product?.fragrance_notes.join(", ") ?? ""
  );
  const [ingredients, setIngredients] = useState(product?.ingredients.join("\n") ?? "");
  const [directions, setDirections] = useState(product?.directions ?? "");
  const [collection, setCollection] = useState<Product["collection"]>(
    product?.collection ?? "floral"
  );
  const [tags, setTags] = useState(product?.tags.join(", ") ?? "");
  const [isActive, setIsActive] = useState(product?.is_active ?? true);
  const [seoTitle, setSeoTitle] = useState(product?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(product?.seo_description ?? "");
  const [images, setImages] = useState<ImageDraft[]>(product?.images ?? []);
  const [variants, setVariants] = useState<VariantDraft[]>(
    product?.variants.length ? product.variants : [{ ...EMPTY_VARIANT }]
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onUploadImage(file: File) {
    setUploading(true);
    const path = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);
    if (error) {
      setError(error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    setImages((prev) => [...prev, { url: data.publicUrl, alt: name, position: prev.length }]);
    setUploading(false);
  }

  function updateVariant(index: number, patch: Partial<VariantDraft>) {
    setVariants((prev) => prev.map((v, i) => (i === index ? { ...v, ...patch } : v)));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      slug,
      name,
      tagline,
      description,
      story,
      fragrance_notes: fragranceNotes.split(",").map((s) => s.trim()).filter(Boolean),
      ingredients: ingredients.split("\n").map((s) => s.trim()).filter(Boolean),
      directions,
      collection,
      tags: tags.split(",").map((s) => s.trim()).filter(Boolean),
      is_active: isActive,
      seo_title: seoTitle || null,
      seo_description: seoDescription || null,
      images: images.map((img, i) => ({ url: img.url, alt: img.alt, position: i })),
      variants: variants.map((v) => ({
        id: v.id,
        label: v.label,
        weight_grams: Number(v.weight_grams),
        burn_time_minutes: Number(v.burn_time_minutes),
        price: Number(v.price),
        compare_at_price: v.compare_at_price ? Number(v.compare_at_price) : null,
        stock: Number(v.stock),
        sku: v.sku,
      })),
    };

    const res = await fetch(isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error ?? "Could not save product.");
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
        />
        <input
          required
          placeholder="Slug (url-friendly)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
        />
        <input
          placeholder="Tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none md:col-span-2"
        />
        <select
          value={collection}
          onChange={(e) => setCollection(e.target.value as Product["collection"])}
          className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
        >
          <option value="floral">Floral</option>
          <option value="fresh">Fresh</option>
          <option value="woody">Woody</option>
          <option value="combo">Combo</option>
        </select>
        <input
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
        />
      </div>

      <textarea
        placeholder="Short description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        className="w-full border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
      />
      <textarea
        placeholder="Story"
        value={story}
        onChange={(e) => setStory(e.target.value)}
        rows={4}
        className="w-full border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
      />
      <input
        placeholder="Fragrance notes (comma separated)"
        value={fragranceNotes}
        onChange={(e) => setFragranceNotes(e.target.value)}
        className="w-full border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
      />
      <textarea
        placeholder="Ingredients (one per line)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        rows={4}
        className="w-full border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
      />
      <textarea
        placeholder="Directions"
        value={directions}
        onChange={(e) => setDirections(e.target.value)}
        rows={2}
        className="w-full border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
      />

      <div>
        <h3 className="text-xs uppercase tracking-widest text-ink-soft">SEO</h3>
        <div className="mt-3 grid gap-4">
          <input
            placeholder="SEO title"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          />
          <textarea
            placeholder="SEO description"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            rows={2}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          />
        </div>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-widest text-ink-soft">Images</h3>
        <div className="mt-3 flex flex-wrap gap-4">
          {images.map((img, i) => (
            <div key={i} className="w-28">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt} className="aspect-square w-full object-cover" />
              <button
                type="button"
                onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                className="mt-1 text-xs text-ink-soft underline underline-offset-4 hover:text-maroon"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUploadImage(file);
          }}
          className="mt-4 text-sm"
        />
        {uploading && <p className="mt-2 text-xs text-ink-soft">Uploading...</p>}
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-widest text-ink-soft">Variants</h3>
        <p className="mt-1 text-xs text-ink-soft">
          Prices are in paise (₹1 = 100) — e.g. ₹450 = 45000.
        </p>
        <div className="mt-3 space-y-4">
          {variants.map((variant, i) => (
            <div key={i} className="grid gap-3 border border-line p-4 md:grid-cols-6">
              <input
                placeholder="Label (e.g. 40g)"
                value={variant.label}
                onChange={(e) => updateVariant(i, { label: e.target.value })}
                className="border border-ink/20 bg-transparent px-2 py-2 text-sm focus:border-maroon focus:outline-none md:col-span-2"
              />
              <input
                type="number"
                placeholder="Weight (g)"
                value={variant.weight_grams}
                onChange={(e) => updateVariant(i, { weight_grams: Number(e.target.value) })}
                className="border border-ink/20 bg-transparent px-2 py-2 text-sm focus:border-maroon focus:outline-none"
              />
              <input
                type="number"
                placeholder="Burn (min)"
                value={variant.burn_time_minutes}
                onChange={(e) => updateVariant(i, { burn_time_minutes: Number(e.target.value) })}
                className="border border-ink/20 bg-transparent px-2 py-2 text-sm focus:border-maroon focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price (paise)"
                value={variant.price}
                onChange={(e) => updateVariant(i, { price: Number(e.target.value) })}
                className="border border-ink/20 bg-transparent px-2 py-2 text-sm focus:border-maroon focus:outline-none"
              />
              <input
                type="number"
                placeholder="Stock"
                value={variant.stock}
                onChange={(e) => updateVariant(i, { stock: Number(e.target.value) })}
                className="border border-ink/20 bg-transparent px-2 py-2 text-sm focus:border-maroon focus:outline-none"
              />
              <input
                placeholder="SKU"
                value={variant.sku}
                onChange={(e) => updateVariant(i, { sku: e.target.value })}
                className="border border-ink/20 bg-transparent px-2 py-2 text-sm focus:border-maroon focus:outline-none md:col-span-2"
              />
              <button
                type="button"
                onClick={() => setVariants((prev) => prev.filter((_, idx) => idx !== i))}
                className="text-xs text-ink-soft underline underline-offset-4 hover:text-maroon"
              >
                Remove variant
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setVariants((prev) => [...prev, { ...EMPTY_VARIANT }])}
          className="mt-3 border border-ink/30 px-4 py-2 text-xs uppercase tracking-widest text-ink hover:border-maroon hover:text-maroon"
        >
          Add Variant
        </button>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink-soft">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        Active (visible on storefront)
      </label>

      {error && <p className="text-sm text-maroon">{error}</p>}

      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : isEdit ? "Save Product" : "Create Product"}
      </Button>
    </form>
  );
}
