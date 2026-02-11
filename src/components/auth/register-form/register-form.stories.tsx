import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { RegisterForm } from './register-form';

const meta = {
  title: 'Components/Auth/RegisterForm',
  component: RegisterForm,
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
