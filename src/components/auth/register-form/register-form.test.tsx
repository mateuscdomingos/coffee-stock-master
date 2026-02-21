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

  describe('when fields are empty', () => {
    it('should render validation errors', async () => {
      render(<RegisterForm />);

      const createAccountButton = screen.getByRole('button', {
        name: 'Create Account',
      });
      await userEvent.click(createAccountButton);

      await waitFor(() => {
        const fullNameInput = screen.getByLabelText('Full Name');
        expect(fullNameInput).toBeInvalid();
        expect(screen.getByText('Name is too short')).toBeInTheDocument();

        const emailInput = screen.getByRole('textbox', { name: 'Email' });
        expect(emailInput).toBeInvalid();
        expect(screen.getByText('Invalid email')).toBeInTheDocument();

        const passwordInput = screen.getByLabelText('Password');
        expect(passwordInput).toBeInvalid();
        expect(
          screen.getByText('Must be at least 8 characters long.'),
        ).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(handleRegister).not.toHaveBeenCalled();
      });
    });
  });

  describe('when password and confirmPassword are different', () => {
    it('should render validation error', async () => {
      render(<RegisterForm />);

      await userEvent.type(screen.getByLabelText('Password'), 'password123');
      await userEvent.type(
        screen.getByLabelText('Confirm Password'),
        'password12',
      );

      const createAccountButton = screen.getByRole('button', {
        name: 'Create Account',
      });
      await userEvent.click(createAccountButton);

      await waitFor(() => {
        const confirmPasswordInput = screen.getByLabelText('Confirm Password');
        expect(confirmPasswordInput).toBeInvalid();
        expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(handleRegister).not.toHaveBeenCalled();
      });
    });
  });

  it('should display "Email Already Exists" error coming from the server action', () => {
    jest
      .spyOn(React, 'useActionState')
      .mockReturnValue([
        { error: { email: 'Email already exists.' } },
        jest.fn(),
        false,
      ]);

    render(<RegisterForm />);

    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    expect(emailInput).toBeInvalid();
    expect(screen.getByText('Email already exists')).toBeInTheDocument();
  });

  it('should display "Invalid fields" error coming from the server action', () => {
    jest
      .spyOn(React, 'useActionState')
      .mockReturnValue([
        { error: { generic: 'Invalid fields. Please check your data.' } },
        jest.fn(),
        false,
      ]);

    render(<RegisterForm />);

    expect(
      screen.getByText('Invalid fields. Please check your data.'),
    ).toBeInTheDocument();
  });

  it('should display "Unknown error" error coming from the server action', () => {
    jest
      .spyOn(React, 'useActionState')
      .mockReturnValue([
        { error: { generic: 'Unknown error' } },
        jest.fn(),
        false,
      ]);

    render(<RegisterForm />);

    expect(screen.getByText('Unknown error')).toBeInTheDocument();
  });

  describe('behavior', () => {
    it('should call handleRegister with form data when submitted', async () => {
      render(<RegisterForm />);

      await userEvent.type(
        screen.getByLabelText('Full Name'),
        'Mateus Domingos',
      );
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Email' }),
        'mateus@example.com',
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
      expect(formData.get('name')).toBe('Mateus Domingos');
      expect(formData.get('email')).toBe('mateus@example.com');
      expect(formData.get('password')).toBe('password123');
      expect(formData.get('confirmPassword')).toBe('password123');
    });
  });
});
