import { render, screen } from '@/test/test-utils';
import { EmptyStores } from './empty-stores';

describe('EmptyStores', () => {
  it('should render the empty state information correctly', async () => {
    const ResolvedComponent = await EmptyStores();
    render(ResolvedComponent);

    expect(screen.getByText('No cafes found')).toBeInTheDocument();
    expect(
      screen.getByText(
        "You haven't registered any units yet. How about starting to organize your inventory now?",
      ),
    ).toBeInTheDocument();
  });

  it('should have a link to create a new store', async () => {
    const ResolvedComponent = await EmptyStores();
    render(ResolvedComponent);

    const link = screen.getByRole('link');

    expect(link).toHaveTextContent('Add new Store');
    expect(link).toHaveAttribute('href', '/stores/new');
  });
});
