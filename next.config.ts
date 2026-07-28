import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/consulting",
        destination: "/services/blueprint",
        permanent: true,
      },
      {
        source: "/services/talent",
        destination: "/services/connect",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
