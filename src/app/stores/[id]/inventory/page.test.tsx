import { render, screen } from '@/test/test-utils';
import InventoryPage from './page';
import { GetProductByStoreIdUseCaseFactory } from '@/infra/factories/GetProductByStoreIdUseCaseFactory';

jest.mock('@/infra/factories/GetProductByStoreIdUseCaseFactory', () => ({
  GetProductByStoreIdUseCaseFactory: {
    makeGetProductByStoreId: jest.fn(),
  },
}));

describe('InventoryPage', () => {
  const mockStoreId = 'store-uuid-123';
  const mockProducts = [
    {
      props: {
        id: 'p1',
        name: 'Coffee Beans',
        roast: 'dark',
        priceInCents: 2000,
        stockQuantity: 50,
        minimumStockQuantity: 10,
        unit: 'kg',
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (
      GetProductByStoreIdUseCaseFactory.makeGetProductByStoreId as jest.Mock
    ).mockReturnValue(jest.fn().mockResolvedValue(mockProducts));
  });

  it('should render the inventory page with products from the use case', async () => {
    const props = {
      params: Promise.resolve({ id: mockStoreId }),
    };

    const ResolvedPage = await InventoryPage(props);
    render(ResolvedPage);

    expect(
      screen.getByRole('heading', { name: 'Inventory' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Manage your beans, supplies, and stock levels.'),
    ).toBeInTheDocument();

    const addButton = screen.getByRole('link');
    expect(addButton).toHaveAttribute(
      'href',
      `/stores/${mockStoreId}/product/new`,
    );

    expect(screen.getByText('Coffee Beans')).toBeInTheDocument();
  });

  it('should call the use case with the correct storeId from params', async () => {
    const mockGetProducts = jest.fn().mockResolvedValue([]);
    (
      GetProductByStoreIdUseCaseFactory.makeGetProductByStoreId as jest.Mock
    ).mockReturnValue(mockGetProducts);

    const props = {
      params: Promise.resolve({ id: mockStoreId }),
    };

    await InventoryPage(props);

    expect(mockGetProducts).toHaveBeenCalledWith(mockStoreId);
  });
});
