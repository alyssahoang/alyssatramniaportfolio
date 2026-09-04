const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Static export for GitHub Pages (`npm run export` -> ./out).
// - trailingSlash: nested routes export as folder/index.html
// - images.unoptimized: next/image emits plain /public paths
// - no redirects(): not supported by static export; see pages/reads.tsx
module.exports = withBundleAnalyzer({
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  // Static export cannot run the image optimiser; serve files as-is.
  images: {
    unoptimized: true,
  },
});
