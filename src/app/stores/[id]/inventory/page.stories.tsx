import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import InventoryPage from './page';
import { GetProductByStoreIdUseCaseFactory } from '@/infra/factories/GetProductByStoreIdUseCaseFactory';

const mockProducts = [
  {
    props: {
      id: '1',
      name: 'Espresso Beans',
      roast: 'dark',
      priceInCents: 5000,
      stockQuantity: 10,
      minimumStockQuantity: 5,
      unit: 'kg',
      storeId: 'store',
    },
  },
];

const meta = {
  title: 'Pages/InventoryPage',
  component: InventoryPage,
  loaders: [
    async () => {
      GetProductByStoreIdUseCaseFactory.makeGetProductByStoreId = () => {
        return async () => mockProducts as any;
      };
      return {};
    },
  ],
} satisfies Meta<typeof InventoryPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    params: Promise.resolve({
      id: 'store-id-123',
    }),
  },
};
