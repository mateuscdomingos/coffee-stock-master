import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { StoreCard } from './store-card';

const meta = {
  title: 'Components/Stores/StoreCard',
  component: StoreCard,
} satisfies Meta<typeof StoreCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    store: {
      id: 'store-123',
      name: 'Main Street Coffee',
      monthlyBudgetInCents: 500000,
      userId: 'user-123',
    },
  },
};
