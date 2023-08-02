/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lemmy.ml",
      },
    ],
  },
};

module.exports = nextConfig;
