import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderWithProviders } from '../../test_utils';
import { server } from '../../mocks/server';
import { items } from '../../mocks/data';
import Home from '../../pages/Home';
import Details from '../Details/Details';

describe('Tests for the Card component', async () => {
  test('Ensure that the card component renders the relevant card data', async () => {
    const { title } = items[0];
    server.listen();
    await renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    server.close();
  });

  test('Validate that clicking on a card opens a detailed card component', async () => {
    const { title } = items[0];
    server.listen();
    await renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="details/:id" element={<Details />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    waitFor(() => {
      fireEvent.click(screen.getByAltText(title));
    });

    waitFor(() => {
      expect(screen.getByAltText('close')).toBeInTheDocument();
    });

    server.close();
  });
});
