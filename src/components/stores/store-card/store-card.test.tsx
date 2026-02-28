import { render, screen } from '@/test/test-utils';
import { StoreCard } from './store-card';
import { StoreProps } from '@/core/domain/Store/store.types';

describe('StoreCard', () => {
  const mockStore: StoreProps = {
    id: 'store-123',
    name: 'Coffee Central',
    monthlyBudgetInCents: 500000,
    userId: 'user-123',
    createdAt: new Date(),
  };

  it('should render store information correctly', () => {
    render(<StoreCard store={mockStore} />);

    expect(screen.getByText('COFFEE CENTRAL')).toBeInTheDocument();
    expect(screen.getByText('MONTHLY BUDGET')).toBeInTheDocument();
    expect(screen.getByText('R$ 5.000,00')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('should have the correct link to store overview', () => {
    render(<StoreCard store={mockStore} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/stores/${mockStore.id}/overview`);
  });
});
