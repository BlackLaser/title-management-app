// src/components/Dashboard/__tests__/TitleForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TitleForm from '../TitleForm';

describe('TitleForm', () => {
  const mockAddTitle = jest.fn();

  it('renders the input and button', () => {
    render(<TitleForm onAddTitle={mockAddTitle} isWalletConnected={true} />);
    expect(screen.getByPlaceholderText('New Title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Title/i })).toBeInTheDocument();
  });

  it('disables input and button when wallet is not connected', () => {
    render(<TitleForm onAddTitle={mockAddTitle} isWalletConnected={false} />);
    expect(screen.getByPlaceholderText('New Title')).toBeDisabled();
    expect(screen.getByRole('button', { name: /Add Title/i })).toBeDisabled();
  });

  it('enables input and button when wallet is connected', () => {
    render(<TitleForm onAddTitle={mockAddTitle} isWalletConnected={true} />);
    expect(screen.getByPlaceholderText('New Title')).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /Add Title/i })).not.toBeDisabled();
  });

  it('calls onAddTitle with correct input data', () => {
    render(<TitleForm onAddTitle={mockAddTitle} isWalletConnected={true} />);
    fireEvent.change(screen.getByPlaceholderText('New Title'), { target: { value: 'Test Title' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Title/i }));
    expect(mockAddTitle).toHaveBeenCalledWith({ title: 'Test Title' });
  });

  it('resets input after form submission', () => {
    render(<TitleForm onAddTitle={mockAddTitle} isWalletConnected={true} />);
    const input = screen.getByPlaceholderText('New Title');
    fireEvent.change(input, { target: { value: 'Test Title' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Title/i }));
    expect(input.value).toBe('');
  });
});
