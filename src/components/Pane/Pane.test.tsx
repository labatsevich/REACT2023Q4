import { screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { items } from '../../mocks/data';
import Pane from './Pane';
import { renderWithProviders } from '../../test_utils';
import { server } from '../../mocks/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import { updateTerm } from '../../store/reducers/appSlice';
import { setupStore } from '../../store';

describe('Pane component', () => {
  test('Verify that the component renders the specified number of cards', async () => {
    const length = items.length;
    server.listen();
    await renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Pane />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByRole('img').length).toEqual(length);
    });

    server.close();
  });
  test('Check that an appropriate message is displayed if no cards are present', async () => {
    const store = setupStore();
    store.dispatch(updateTerm('blabla'));

    server.listen();
    await waitFor(() =>
      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>,
        {
          store,
        }
      )
    );

    waitFor(() => {
      expect(screen.getByText(/Nothing found/i)).toBeInTheDocument();
    });
    server.close();
  });
});
