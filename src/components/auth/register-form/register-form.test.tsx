import { RegisterForm } from './register-form';
import React from 'react';
import { render, screen, waitFor } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';

jest.mock('@/app/actions/auth-actions', () => ({
  handleRegister: jest.fn(),
}));

import { handleRegister } from '@/app/actions/auth-actions';

describe('RegisterForm', () => {
  it('should render all input fields with translated labels', () => {
    render(<RegisterForm />);

    expect(
      screen.getByRole('textbox', { name: 'Full Name' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Create Account' }),
    ).toBeInTheDocument();
  });

  it('should render rich text link correctly', () => {
    render(<RegisterForm />);

    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Sign in' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('should display error message when state.error is present', () => {
    jest
      .spyOn(React, 'useActionState')
      .mockReturnValue([{ error: 'Invalid credentials' }, jest.fn(), false]);

    render(<RegisterForm />);

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  describe('behavior', () => {
    it('should call handleRegister with form data when submitted', async () => {
      render(<RegisterForm />);

      await userEvent.type(screen.getByLabelText('Full Name'), 'John Doe');
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Email' }),
        'john@example.com',
      );
      await userEvent.type(screen.getByLabelText('Password'), 'password123');
      await userEvent.type(
        screen.getByLabelText('Confirm Password'),
        'password123',
      );

      const createAccountButton = screen.getByRole('button', {
        name: 'Create Account',
      });

      await userEvent.click(createAccountButton);

      await waitFor(() => {
        expect(handleRegister).toHaveBeenCalled();
      });

      const [prevState, formData] = (handleRegister as jest.Mock).mock.calls[0];

      expect(prevState).toBeUndefined();
      expect(formData.get('name')).toBe('John Doe');
      expect(formData.get('email')).toBe('john@example.com');
      expect(formData.get('password')).toBe('password123');
      expect(formData.get('confirmPassword')).toBe('password123');
    });
  });
});
