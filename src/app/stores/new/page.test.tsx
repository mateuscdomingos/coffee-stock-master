import { render, screen } from '@/test/test-utils';
import NewStorePage from './page';

jest.mock('@/app/actions/store-actions', () => ({
  handleCreateStore: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('NewStorePage', () => {
  it('should render the title and the new store form', async () => {
    const ResolvedPage = await NewStorePage();
    render(ResolvedPage);

    expect(
      screen.getByRole('heading', { name: 'Create new Store' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Enter Store information below to create a new Store.'),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should render the breadcrumb with correct navigation steps', async () => {
    const ResolvedPage = await NewStorePage();
    render(ResolvedPage);

    const breadcrumb = screen.getByRole('navigation', { name: 'breadcrumb' });
    expect(breadcrumb).toBeInTheDocument();

    const storesLink = screen.getByRole('link', { name: 'Stores' });
    expect(storesLink).toHaveAttribute('href', '/stores');

    const currentPage = screen.getByText('New Store', { selector: 'span' });
    expect(currentPage).toBeInTheDocument();
  });
});
