import { render, screen } from '@/test/test-utils';
import LoginPage from './page';

jest.mock('@/app/actions/auth-actions', () => ({
  handleRegister: jest.fn(),
}));

describe('LoginPage', () => {
  it('should render the title and the login form', async () => {
    const ResolvedPage = await LoginPage();
    render(ResolvedPage);

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(
      screen.getByText('Enter your email below to login to your account.'),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });
});
