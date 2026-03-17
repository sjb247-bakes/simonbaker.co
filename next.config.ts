import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/hypnotherapy',
        destination: '/performance',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
