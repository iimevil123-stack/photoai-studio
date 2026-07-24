/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    // ESLint warnings (e.g. <img> instead of <Image>) won't fail production builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
