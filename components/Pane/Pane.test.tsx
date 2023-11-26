import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { items } from '../../mocks/data';
import Pane from '../Pane/index';
import { mockedRouter } from '@/mocks/mockedRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { IAnime } from '@/types';

describe('Pane component', () => {
  test('Verify that the component renders the specified number of cards', async () => {
    

    const length = items.length;

    await act(() => render(
      <RouterContext.Provider value={mockedRouter({})}>
        <Pane data={items} />
      </RouterContext.Provider>
    ));

    await waitFor(() => {
      expect(screen.getAllByRole('img').length).toEqual(length);
    });

  });

  test('Check that an appropriate message is displayed if no cards are present', async () => {
  
    await act(() => render(
      <RouterContext.Provider value={mockedRouter({})}>
        <Pane data={[] as IAnime[]} />
      </RouterContext.Provider>
    ));

    await waitFor(() => {
      expect(screen.getByText(/Nothing found/i)).toBeInTheDocument();
    });

  });

  
});