/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  generateBuildId: async () => 'frgd-1',
};
export default nextConfig;
