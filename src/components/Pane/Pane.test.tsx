import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { AppContext } from '../../context/AppContextProvider';
import { items } from '../../mocks/data';
import Pane from './Pane';

describe('Pane component', () => {
  test('Verify that the component renders the specified number of cards', async () => {
    render(
      <MemoryRouter>
        <AppContext.Provider
          value={{
            term: '',
            setTerm: () => {},
            data: [...items],
            setData: () => {},
            currentPage: 1,
            setCurrentPage: () => {},
            loaded: true,
            setLoaded: () => {},
          }}
        >
          <Pane />
        </AppContext.Provider>
      </MemoryRouter>
    );
    const cards = screen.getAllByRole('img');
    expect(cards.length).toEqual(10);
  });

  test('Check that an appropriate message is displayed if no cards are present', () => {
    render(
      <BrowserRouter>
        <AppContext.Provider
          value={{
            term: '',
            setTerm: () => {},
            data: [],
            setData: () => {},
            currentPage: 1,
            setCurrentPage: () => {},
            loaded: true,
            setLoaded: () => {},
          }}
        >
          <Pane />
        </AppContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Nothing found/i)).toBeInTheDocument();
  });
});
