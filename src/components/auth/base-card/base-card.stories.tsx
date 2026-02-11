import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BaseCard } from './base-card';

const meta = {
  title: 'Components/Auth/BaseCard',
  component: BaseCard,
} satisfies Meta<typeof BaseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <span>Children</span>,
    description: 'Description',
  },
};
