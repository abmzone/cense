"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print border border-ink/30 px-5 py-2 text-xs uppercase tracking-widest text-ink hover:border-maroon hover:text-maroon"
    >
      Print / Save as PDF
    </button>
  );
}
