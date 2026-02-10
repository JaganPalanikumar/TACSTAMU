/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/TACS",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
