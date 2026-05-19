/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_EXPORT === 'true';

const nextConfig = {
  output: isExport ? 'export' : undefined,
  images: {
    unoptimized: isExport ? true : undefined, // Static exports require unoptimized images unless using a third-party loader
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Redirects are not supported in static exports
  ...(isExport ? {} : {
    async redirects() {
      return [
        {
          source: '/home',
          destination: '/',
          permanent: true,
        },
      ];
    },
  }),
};

export default nextConfig;

