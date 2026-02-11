import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import RegisterPage from './page';

const meta = {
  title: 'Pages/RegisterPage',
  component: RegisterPage,
} satisfies Meta<typeof RegisterPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
