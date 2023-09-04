/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  //   serverComponentsExternalPackages: ['mongoose'],
  // },
  images: {
    domains: ['lh3.googleusercontent.com'], // for images from session: see more https://nextjs.org/docs/messages/next-image-unconfigured-host
  },
  // webpack(config) {
  //   config.experiments = {
  //     ...config.experiments,
  //     topLevelAwait: true,
  //   };
  //   return config;
  // },
};

module.exports = nextConfig;
