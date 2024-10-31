import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TitleForm from '../components/Dashboard/TitleForm';

describe('TitleForm Component', () => {
  const onAddTitle = jest.fn();

  test('renders TitleForm', () => {
    render(<TitleForm onAddTitle={onAddTitle} />);
    expect(screen.getByPlaceholderText('New Title')).toBeInTheDocument();
  });

  test('handles title submission', () => {
    render(<TitleForm onAddTitle={onAddTitle} />);
    fireEvent.change(screen.getByPlaceholderText('New Title'), { target: { value: 'New Title' } });
    fireEvent.click(screen.getByText('Add Title'));
    
    expect(onAddTitle).toHaveBeenCalledWith({ subject: 'New Title' });
  });
});
