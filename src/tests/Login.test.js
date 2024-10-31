import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Auth/Login';
import { AuthContext } from '../contexts/AuthContext';

describe('Login Component', () => {
  const setUser = jest.fn();

  test('renders Login form', () => {
    render(
      <AuthContext.Provider value={{ setUser }}>
        <Login />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('handles login submit', async () => {
    render(
      <AuthContext.Provider value={{ setUser }}>
        <Login />
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Login'));

    // Check for successful login (mock implementation)
    // setUser would be called upon successful login
    expect(setUser).toHaveBeenCalled();
  });
});
