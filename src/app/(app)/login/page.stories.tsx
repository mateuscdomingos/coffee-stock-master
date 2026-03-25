import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import LoginPage from './page';

const meta = {
  title: 'Pages/LoginPage',
  component: LoginPage,
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
