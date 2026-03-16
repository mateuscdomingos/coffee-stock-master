import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Breadcrumb } from './breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Navigation/Breadcrumb',
  component: Breadcrumb,
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Stores', href: '/stores' },
      { label: 'Inventory' },
    ],
  },
};
