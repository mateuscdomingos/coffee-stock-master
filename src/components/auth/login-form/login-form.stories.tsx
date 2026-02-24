import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { LoginForm } from './login-form';

const meta = {
  title: 'Components/Auth/LoginForm',
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
