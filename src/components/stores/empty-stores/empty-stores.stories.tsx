import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { EmptyStores } from './empty-stores';

const meta = {
  title: 'Components/Stores/EmptyStores',
  component: EmptyStores,
} satisfies Meta<typeof EmptyStores>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
