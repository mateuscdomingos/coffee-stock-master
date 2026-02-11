import { render, screen } from '@/test/test-utils';
import { BaseCard } from './base-card';

describe('BaseCard', () => {
  it('should render the description and children correctly', () => {
    const descriptionText = 'Description Test';
    const childrenText = 'Children Text';

    render(
      <BaseCard description={descriptionText}>
        <div>{childrenText}</div>
      </BaseCard>,
    );

    expect(screen.getByText(descriptionText)).toBeInTheDocument();
    expect(screen.getByText(childrenText)).toBeInTheDocument();
  });

  it('should allow rendering React elements as description', () => {
    const CustomDescription = (
      <span data-testid="custom-desc">Rich Description</span>
    );

    render(
      <BaseCard description={CustomDescription}>
        <p>Main Content</p>
      </BaseCard>,
    );

    expect(screen.getByTestId('custom-desc')).toBeInTheDocument();
  });
});
