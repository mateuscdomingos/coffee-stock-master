import { render, screen } from '@/test/test-utils';
import NewProductPage from './page';

jest.mock('next/navigation', () => ({
  useParams: () => ({
    id: 'store-id',
  }),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/app/actions/product-actions', () => ({
  handleCreateProduct: jest.fn(),
}));

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

describe('NewProductPage', () => {
  const mockStoreId = 'store-uuid-123';
  const props = {
    params: Promise.resolve({ id: mockStoreId }),
  };

  it('should render the title and the product form with correct translations', async () => {
    const ResolvedPage = await NewProductPage(props);
    render(ResolvedPage);

    expect(
      screen.getByRole('heading', { name: 'Create new Product' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Enter Product information below to create a new Product.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render the breadcrumb with correct navigation steps', async () => {
    const ResolvedPage = await NewProductPage(props);
    render(ResolvedPage);

    const breadcrumb = screen.getByRole('navigation', { name: 'breadcrumb' });
    expect(breadcrumb).toBeInTheDocument();

    const storesLink = screen.getByRole('link', { name: 'Stores' });
    expect(storesLink).toHaveAttribute('href', '/stores');

    const inventoryLink = screen.getByRole('link', { name: 'Inventory' });
    expect(inventoryLink).toHaveAttribute(
      'href',
      `/stores/${mockStoreId}/inventory`,
    );

    const currentPage = screen.getByText('New Product', { selector: 'span' });
    expect(currentPage).toBeInTheDocument();
  });
});
