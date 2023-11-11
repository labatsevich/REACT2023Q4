import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from '../../context/AppContextProvider';
import { items } from '../../mocks/data';
import Pane from './Pane';

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
        }}
      >
        <Pane />
      </AppContext.Provider>
    </MemoryRouter>
  );
  const cards = screen.getAllByRole('img');
  expect(cards.length).toEqual(2);
});
