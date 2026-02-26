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

    const mockPath = path.resolve(__dirname, 'mocks/empty-module.ts');
    const serverMockPath = path.resolve(__dirname, 'mocks/next-intl-server.ts');

    config.resolve.alias = [
      { find: 'next-intl/server', replacement: serverMockPath },
      { find: /.*\/prisma\/generated\/client/, replacement: mockPath },
      { find: /^@prisma\/client/, replacement: mockPath },
      { find: 'pg', replacement: mockPath },
      { find: '@prisma/adapter-pg', replacement: mockPath },

      { find: '@', replacement: path.resolve(__dirname, '../src') },
    ];

    config.optimizeDeps = {
      ...config.optimizeDeps,
      exclude: ['pg', '@prisma/client', '@prisma/adapter-pg'],
    };

    config.define = { 'process.env': {}, __dirname: JSON.stringify('') };

    return config;
  },
};
export default config;
