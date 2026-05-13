import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/admin-preview/customize",
        destination: "/admin-preview/design",
        permanent: false,
      },
      {
        source: "/admin-preview/customize/:path*",
        destination: "/admin-preview/design/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
