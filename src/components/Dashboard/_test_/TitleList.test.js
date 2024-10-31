// src/components/Dashboard/__tests__/TitleList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TitleList from '../TitleList';

describe('TitleList', () => {
  const mockDeleteTitle = jest.fn();
  const titles = [
    { uuid: '1', title: 'Title 1' },
    { uuid: '2', title: 'Title 2' },
  ];

  it('renders a list of titles', () => {
    render(<TitleList titles={titles} onDeleteTitle={mockDeleteTitle} isWalletConnected={true} />);
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Title 2')).toBeInTheDocument();
  });

  it('calls onDeleteTitle with the correct ID', () => {
    render(<TitleList titles={titles} onDeleteTitle={mockDeleteTitle} isWalletConnected={true} />);
    fireEvent.click(screen.getAllByRole('button', { name: /Delete/i })[0]);
    expect(mockDeleteTitle).toHaveBeenCalledWith('1');
  });

  it('disables Delete button when wallet is not connected', () => {
    render(<TitleList titles={titles} onDeleteTitle={mockDeleteTitle} isWalletConnected={false} />);
    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    deleteButtons.forEach(button => expect(button).toBeDisabled());
  });

  it('enables Delete button when wallet is connected', () => {
    render(<TitleList titles={titles} onDeleteTitle={mockDeleteTitle} isWalletConnected={true} />);
    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    deleteButtons.forEach(button => expect(button).not.toBeDisabled());
  });
});
