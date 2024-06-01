/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.microcms-assets.io"],
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/setlists",
      permanent: true,
    },
  ],
};

export default nextConfig;
