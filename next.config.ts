import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "flutterwave.com" },
      { protocol: "https", hostname: "qore.inc" },
      { protocol: "https", hostname: "beyondcredit.com.ng" },
      { protocol: "https", hostname: "gstatic.opayweb.com" },
      { protocol: "https", hostname: "moniepoint.com" },
    ],
  },
};

export default nextConfig;
