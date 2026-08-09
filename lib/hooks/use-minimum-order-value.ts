"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const FALLBACK_MINIMUM_ORDER_VALUE = 15000; // paise, mirrors lib/data/fallback-content.ts

export function useMinimumOrderValue() {
  const [minimumOrderValue, setMinimumOrderValue] = useState(FALLBACK_MINIMUM_ORDER_VALUE);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("settings")
      .select("minimum_order_value")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data?.minimum_order_value != null) {
          setMinimumOrderValue(data.minimum_order_value);
        }
      });
  }, []);

  return minimumOrderValue;
}
