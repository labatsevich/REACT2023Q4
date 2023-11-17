import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from './Details';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderWithProviders } from '../../test_utils';
import { server } from '../../mocks/server';
import { items } from '../../mocks/data';

describe('Tests for the Detailed Card component', async () => {
  server.listen();
  test('Check that a loading indicator is displayed while fetching data', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTitle('loading')).toBeVisible();
    server.close();
  });

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const { title, year } = items[0];
    server.listen();
    await renderWithProviders(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByRole('img').getAttribute('alt')).toEqual(title);
      expect(screen.getByText(`${year}`)).toBeInTheDocument();
    });
    server.close();
  });

  test('Ensure that clicking the close button hides the component', async () => {
    server.listen();
    renderWithProviders(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    waitFor(() => {
      const btn = screen.getByTitle('close');
      fireEvent.click(btn);
    });

    waitFor(() => {
      const details = screen.getByRole('article');
      expect(details).not.toBeInTheDocument();
    });

    server.close();
  });
});
