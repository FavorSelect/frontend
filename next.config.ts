import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "cdn.dummyjson.com",
      "database-1.cn2s286amw68.eu-north-1.rds.amazonaws.com",
      "favorselect113.s3.eu-north-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
