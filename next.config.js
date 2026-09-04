const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Static export for GitHub Pages (`npm run export` -> ./out).
// - trailingSlash: nested routes export as folder/index.html
// - images: custom loader keeps next/image working without the image server
// - no redirects(): not supported by static export; see pages/reads.tsx
module.exports = withBundleAnalyzer({
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  images: {
    loader: 'akamai',
    path: '/',
  },
});
