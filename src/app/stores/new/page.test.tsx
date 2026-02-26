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
});
