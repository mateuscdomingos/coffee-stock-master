import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AddProductForm } from './add-product-form';

const meta = {
  title: 'Components/Product/AddProductForm',
  component: AddProductForm,
} satisfies Meta<typeof AddProductForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
