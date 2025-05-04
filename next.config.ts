import { allowedImageDomains } from "@/lib/imageAssets";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */  
  images: {
    domains: allowedImageDomains,
  },
};

export default nextConfig;
