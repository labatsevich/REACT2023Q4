import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from './NotFound';

test('Tests for the 404 Page component', () => {
  render(
    <MemoryRouter initialEntries={['/bad-url']}>
      <NotFound />
    </MemoryRouter>
  );

  const link = screen.getByText(/Home/i);
  expect(link).toBeInTheDocument();
});
