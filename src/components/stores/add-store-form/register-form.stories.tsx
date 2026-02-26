import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AddStoreForm } from './add-store-form';

const meta = {
  title: 'Components/Stores/AddStoreForm',
  component: AddStoreForm,
} satisfies Meta<typeof AddStoreForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
