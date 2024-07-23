/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['"https://utfs.io'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
