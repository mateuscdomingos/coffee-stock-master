import { render, screen } from '@/test/test-utils';
import RegisterPage from './page';

jest.mock('@/app/actions/auth-actions', () => ({
  handleRegister: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('RegisterPage', () => {
  it('should render the title and the register form', async () => {
    const ResolvedPage = await RegisterPage();
    render(ResolvedPage);

    expect(
      screen.getByRole('heading', { name: 'Create an account' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Enter your information below to create your account.'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Create Account' }),
    ).toBeInTheDocument();
  });
});
