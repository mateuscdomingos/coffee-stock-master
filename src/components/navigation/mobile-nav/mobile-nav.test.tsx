import { render, screen } from '@/test/test-utils';
import { MobileNav } from '../mobile-nav';
import userEvent from '@testing-library/user-event';

jest.mock('../language-switcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher" />,
}));

describe('MobileNav Component', () => {
  it('should render the menu trigger button', () => {
    render(<MobileNav isAuthenticated={false} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should open the drawer and show login/register links when unauthenticated', async () => {
    const user = userEvent.setup();
    render(<MobileNav isAuthenticated={false} />);

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('StoreManager')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.queryByText('My Stores')).not.toBeInTheDocument();
  });

  it('should show myStores link when authenticated', async () => {
    const user = userEvent.setup();
    render(<MobileNav isAuthenticated={true} />);

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('My Stores')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('should render LanguageSwitcher and preferences label', async () => {
    const user = userEvent.setup();
    render(<MobileNav isAuthenticated={false} />);

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('Preferences')).toBeInTheDocument();
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });

  it('should close the drawer when a link is clicked', async () => {
    const user = userEvent.setup();
    render(<MobileNav isAuthenticated={false} />);

    await user.click(screen.getByRole('button'));

    const homeLink = screen.getByText('Home');
    await user.click(homeLink);

    expect(screen.queryByText('StoreManager')).not.toBeInTheDocument();
  });
});
