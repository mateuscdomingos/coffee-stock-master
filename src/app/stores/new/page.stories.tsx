import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import NewStorePage from './page';

const meta = {
  title: 'Pages/NewStorePage',
  component: NewStorePage,
} satisfies Meta<typeof NewStorePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
