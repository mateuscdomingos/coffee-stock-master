import { render, screen } from '@/test/test-utils';
import { LanguageSwitcher } from '../language-switcher';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import { useLocale } from 'next-intl';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-intl', () => {
  return {
    useLocale: jest.fn(),
    useTranslations: jest.fn(() => (key: string) => key),
    NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="next-intl-provider">{children}</div>
    ),
  };
});

describe('LanguageSwitcher Component', () => {
  const mockRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      refresh: mockRefresh,
    });
    (useLocale as jest.Mock).mockReturnValue('en');
  });

  it('should render the language icon button with correct accessible label', () => {
    render(<LanguageSwitcher />);

    const button = screen.getByRole('button', {
      name: 'switchLanguage',
    });
    expect(button).toBeInTheDocument();
  });

  it('should highlight the currently active language (pt)', async () => {
    (useLocale as jest.Mock).mockReturnValue('pt');
    render(<LanguageSwitcher />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    const ptOption = screen.getByText('Português (BR)');
    expect(ptOption.closest('div')).toHaveClass('bg-accent');
  });

  it('should highlight the currently active language (en)', async () => {
    const user = userEvent.setup();

    render(<LanguageSwitcher />);

    const button = screen.getByRole('button');
    await user.click(button);

    const enOption = screen.getByText('English');
    expect(enOption.closest('div')).toHaveClass('bg-accent');
  });

  it('should update the NEXT_LOCALE cookie and refresh the page when a new language is selected', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    const button = screen.getByRole('button');
    await user.click(button);

    const enOption = screen.getByText('Português (BR)');
    await user.click(enOption);

    expect(document.cookie).toContain('NEXT_LOCALE=pt');

    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });
});
