import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  ...(isGitHubPages
    ? {
        assetPrefix: '/portfolio',
      }
    : {}),
};

export default nextConfig;
