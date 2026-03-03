import type { StorybookConfig } from '@storybook/nextjs-vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/nextjs-vite',
  features: {
    experimentalRSC: true,
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};

    const emptyMockPath = path.resolve(__dirname, 'mocks/empty-module.ts');
    const serverMockPath = path.resolve(__dirname, 'mocks/next-intl-server.ts');
    const authMockPath = path.resolve(__dirname, 'mocks/auth.ts');
    const nextAuthMockPath = path.resolve(__dirname, 'mocks/next-auth-v5.ts');

    config.resolve.alias = [
      { find: 'next-intl/server', replacement: serverMockPath },
      { find: /.*\/prisma\/generated\/client/, replacement: emptyMockPath },
      { find: /^@prisma\/client/, replacement: emptyMockPath },
      { find: 'pg', replacement: emptyMockPath },
      { find: '@prisma/adapter-pg', replacement: emptyMockPath },
      { find: /^@\/auth$/, replacement: authMockPath },
      { find: /^next-auth($|\/.*)/, replacement: nextAuthMockPath },

      { find: '@', replacement: path.resolve(__dirname, '../src') },
    ];

    config.optimizeDeps = {
      ...config.optimizeDeps,
      exclude: ['pg', '@prisma/client', '@prisma/adapter-pg'],
    };

    config.define = {
      ...config.define,
      __dirname: JSON.stringify(''),
      'process.env.AUTH_SECRET': JSON.stringify('storybook-secret-123'),
      'process.env.AUTH_SECRET_1': JSON.stringify('storybook-secret-123'),
    };

    return config;
  },
};
export default config;
