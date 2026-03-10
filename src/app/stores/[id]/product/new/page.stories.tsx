import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import NewProductPage from './page';

const meta = {
  title: 'Pages/NewProductPage',
  component: NewProductPage,
} satisfies Meta<typeof NewProductPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
