import { AddStoreForm } from './add-store-form';
import React from 'react';
import { render, screen, waitFor } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { handleCreateStore } from '@/app/actions/store-actions';
import { toast } from 'sonner';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}));

jest.mock('@/app/actions/store-actions', () => ({
  handleCreateStore: jest.fn(),
}));

describe('AddStoreForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all input fields with translated labels', () => {
    render(<AddStoreForm />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Monthly Budget' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Set a maximum monthly spending limit for this store. This amount will help you monitor your financial health and avoid unexpected costs.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  describe('Validation', () => {
    it('should render validation errors when fields are empty', async () => {
      render(<AddStoreForm />);

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Name is too short')).toBeInTheDocument();
        expect(
          screen.getByText('The budget needs to be greater than 0'),
        ).toBeInTheDocument();
      });

      expect(handleCreateStore).not.toHaveBeenCalled();
    });
  });

  describe('Currency Formatting', () => {
    it('should format cents to currency while typing', async () => {
      render(<AddStoreForm />);

      const budgetInput = screen.getByRole('textbox', {
        name: 'Monthly Budget',
      });

      await userEvent.type(budgetInput, '12345');

      expect(budgetInput).toHaveValue('R$ 123,45');
    });
  });

  describe('Server Action States', () => {
    it('should display success toast and redirect on success', () => {
      jest
        .spyOn(React, 'useActionState')
        .mockReturnValue([{ success: true }, jest.fn(), false]);

      render(<AddStoreForm />);

      expect(toast.success).toHaveBeenCalledWith('Store created.');
      expect(mockPush).toHaveBeenCalledWith('/stores');
    });

    it('should display "Invalid fields" error from server action', () => {
      jest
        .spyOn(React, 'useActionState')
        .mockReturnValue([
          { error: { generic: 'Invalid fields. Please check your data.' } },
          jest.fn(),
          false,
        ]);

      render(<AddStoreForm />);

      expect(screen.getByText('Invalid fields')).toBeInTheDocument();
    });

    it('should display "Unknown error" from server action', () => {
      jest
        .spyOn(React, 'useActionState')
        .mockReturnValue([
          { error: { generic: 'Some random error' } },
          jest.fn(),
          false,
        ]);

      render(<AddStoreForm />);

      expect(screen.getByText('Unknown error')).toBeInTheDocument();
    });

    it('should disable the button while the action is pending', () => {
      jest
        .spyOn(React, 'useActionState')
        .mockReturnValue([undefined, jest.fn(), true]);

      render(<AddStoreForm />);

      const submitButton = screen.getByRole('button', {
        name: 'Loading Submit',
      });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Behavior', () => {
    it('should call handleCreateStore with formatted form data when submitted', async () => {
      render(<AddStoreForm />);

      await userEvent.type(
        screen.getByRole('textbox', { name: 'Name' }),
        'My Store',
      );

      await userEvent.type(
        screen.getByRole('textbox', { name: 'Monthly Budget' }),
        '50000',
      );

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(handleCreateStore).toHaveBeenCalled();
      });

      const [prevState, formData] = (handleCreateStore as jest.Mock).mock
        .calls[0];

      expect(prevState).toBeUndefined();
      expect(formData.get('name')).toBe('My Store');
      expect(formData.get('monthlyBudgetInCents')).toBe('50000');
    });
  });
});
