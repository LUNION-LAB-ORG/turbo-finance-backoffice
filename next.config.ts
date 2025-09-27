import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend-prod.turbodeliveryapp.com",
        pathname: "/**", // autorise tous les chemins
      },
    ],
  },
};

export default nextConfig;
