/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "/public",
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
