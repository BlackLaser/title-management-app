import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../components/Auth/Register';
import { AuthContext } from '../contexts/AuthContext';

describe('Register Component', () => {
  test('renders Register form', () => {
    render(<Register />);
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('handles registration submit', async () => {
    const mockRegister = jest.fn();
    render(<Register register={mockRegister} />);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'newpassword' } });
    fireEvent.click(screen.getByText('Register'));

    expect(mockRegister).toHaveBeenCalled();
  });
});
