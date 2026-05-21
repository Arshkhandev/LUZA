const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@luza/commands", "@luza/shared", "@luza/ui"],
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
