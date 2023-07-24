/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sum-records",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
