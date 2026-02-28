import { render, screen } from '@/test/test-utils';
import StoresPage from './page';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { StoreUseCaseFactory } from '@/infra/factories/StoreUseCaseFactory';
import { Store } from '@/core/domain/Store/Store.class';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('@/infra/factories/StoreUseCaseFactory', () => ({
  StoreUseCaseFactory: {
    makeGetStoresByUser: jest.fn(),
  },
}));

describe('StoresPage', () => {
  const mockUserId = 'user-123';
  const mockStores = [
    new Store({
      id: 'store-1',
      name: 'Store One',
      monthlyBudgetInCents: 100000,
      userId: mockUserId,
    }),
    new Store({
      id: 'store-2',
      name: 'Store Two',
      monthlyBudgetInCents: 200000,
      userId: mockUserId,
    }),
  ];

  beforeEach(() => {
    (auth as jest.Mock).mockResolvedValue({ user: { id: mockUserId } });
    (StoreUseCaseFactory.makeGetStoresByUser as jest.Mock).mockReturnValue(
      jest.fn().mockResolvedValue(mockStores),
    );
  });

  it('should redirect to login if user is not authenticated', async () => {
    (auth as jest.Mock).mockResolvedValue(null);
    const mockGetStores = jest.fn().mockResolvedValue([]);
    (StoreUseCaseFactory.makeGetStoresByUser as jest.Mock).mockReturnValue(
      mockGetStores,
    );

    await StoresPage();

    expect(redirect).toHaveBeenCalledWith('/login');
    expect(mockGetStores).not.toHaveBeenCalled();
  });

  it('should render page title and add button', async () => {
    const ResolvedPage = await StoresPage();
    render(ResolvedPage);

    expect(screen.getByRole('heading', { name: 'Stores' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Add new Store' }),
    ).toBeInTheDocument();
  });

  it('should render the list of stores when they exist', async () => {
    const ResolvedPage = await StoresPage();
    render(ResolvedPage);

    expect(screen.getByText('STORE ONE')).toBeInTheDocument();
    expect(screen.getByText('STORE TWO')).toBeInTheDocument();
  });

  it('should call getStores with the correct userId from session', async () => {
    const mockGetStores = jest.fn().mockResolvedValue([]);
    (StoreUseCaseFactory.makeGetStoresByUser as jest.Mock).mockReturnValue(
      mockGetStores,
    );

    await StoresPage();

    expect(mockGetStores).toHaveBeenCalledWith(mockUserId);
  });

  it('should render empty grid if there are no stores', async () => {
    (StoreUseCaseFactory.makeGetStoresByUser as jest.Mock).mockReturnValue(
      jest.fn().mockResolvedValue([]),
    );

    const ResolvedPage = await StoresPage();
    render(ResolvedPage);

    const storeLinks = screen.queryAllByRole('link');
    const storeCards = storeLinks.filter((link) =>
      link.getAttribute('href')?.includes('/overview'),
    );

    expect(storeCards).toHaveLength(0);
  });
});
