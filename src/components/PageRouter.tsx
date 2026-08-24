"use client";

import { useSearchParams } from "next/navigation";
import WeddingContent from "@/components/WeddingContent";
import { weddingConfig } from "@/config/wedding";
import { weddingConfigEn } from "@/config/wedding.en";

export default function PageRouter() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const config = lang === "en" ? weddingConfigEn : weddingConfig;

  return <WeddingContent config={config} />;
}
