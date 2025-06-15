import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "database-1.cn2s286amw68.eu-north-1.rds.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "favorselect113.s3.eu-north-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "favorselect114.s3.us-east-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
