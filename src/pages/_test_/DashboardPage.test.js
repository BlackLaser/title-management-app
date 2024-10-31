// src/pages/__tests__/DashboardPage.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DashboardPage from '../DashboardPage';
import { getTitles, addTitle, deleteTitle } from '../../api/title';
import { AuthContext } from '../../contexts/AuthContext';
import useMetaMask from '../../hooks/useMetaMask';

jest.mock('../../api/title');
jest.mock('../../hooks/useMetaMask', () => ({
    __esModule: true,
    default: jest.fn(() => ({ account: '0x123', connect: jest.fn() })),
  }));

const mockTitles = [{ uuid: '1', title: 'Test Title 1' }];

describe('DashboardPage', () => {
  beforeEach(() => {
    getTitles.mockResolvedValue({ data: mockTitles });
    addTitle.mockResolvedValue({ data: { uuid: '2', title: 'New Title' } });
    deleteTitle.mockResolvedValue();
  });

  it('renders titles from the API', async () => {
    render(
      <AuthContext.Provider value={{ token: 'test-token', logout: jest.fn() }}>
        <DashboardPage />
      </AuthContext.Provider>
    );

    await waitFor(() => expect(screen.getByText('Test Title 1')).toBeInTheDocument());
  });

  it('adds a new title', async () => {
    useMetaMask.mockReturnValue({ account: '0x123', connectWallet: jest.fn() });

    render(
      <AuthContext.Provider value={{ token: 'test-token', logout: jest.fn() }}>
        <DashboardPage />
      </AuthContext.Provider>
    );

    const input = screen.getByPlaceholderText('New Title');
    fireEvent.change(input, { target: { value: 'New Title' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Title/i }));

    await waitFor(() => expect(screen.getByText('New Title')).toBeInTheDocument());
  });

  it('deletes a title', async () => {
    useMetaMask.mockReturnValue({ account: '0x123', connectWallet: jest.fn() });

    render(
      <AuthContext.Provider value={{ token: 'test-token', logout: jest.fn() }}>
        <DashboardPage />
      </AuthContext.Provider>
    );

    await waitFor(() => expect(screen.getByText('Test Title 1')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

    await waitFor(() => expect(screen.queryByText('Test Title 1')).not.toBeInTheDocument());
  });

  it('shows an error if MetaMask is not connected', async () => {
    useMetaMask.mockReturnValue({ account: null, connectWallet: jest.fn() });

    render(
      <AuthContext.Provider value={{ token: 'test-token', logout: jest.fn() }}>
        <DashboardPage />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Add Title/i }));
    expect(screen.getByText('Connect your MetaMask wallet to add titles.')).toBeInTheDocument();
  });
});
