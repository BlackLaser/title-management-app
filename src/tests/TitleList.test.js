import React from 'react';
import { render, screen } from '@testing-library/react';
import TitleList from '../components/Dashboard/TitleList';

describe('TitleList Component', () => {
  const titles = [
    { id: 1, subject: 'Sample Title 1' },
    { id: 2, subject: 'Sample Title 2' },
  ];

  test('displays titles', () => {
    render(<TitleList titles={titles} onDeleteTitle={jest.fn()} />);

    titles.forEach((title) => {
      expect(screen.getByText(title.subject)).toBeInTheDocument();
    });
  });
});
