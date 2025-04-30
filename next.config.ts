import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */  
  images: {
    domains: [
      'bootcamp-project-api.s3.ap-northeast-2.amazonaws.com','google.com'
    ],
  },
};

export default nextConfig;
