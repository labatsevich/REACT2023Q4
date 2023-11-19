import { describe, expect, test } from 'vitest';
import { renderWithProviders } from '../../test_utils';
import Searchbar from './Searchbar';
import { screen } from '@testing-library/dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { setupStore } from '../../store';
import { updateTerm } from '../../store/reducers/appSlice';
import Home from '../../pages/Home';

const text = 'Cowboy';

describe('Tests for the Search component', () => {
  test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    userEvent.setup();

    renderWithProviders(
      <BrowserRouter>
        <Searchbar />
      </BrowserRouter>
    );
    const search = screen.getByRole('searchbox');
    const btn = screen.getByRole('button');
    await act(async () => {
      await userEvent.type(search, text);
      await userEvent.click(btn);
    });

    await expect(localStorage.getItem('searchTerm')).toEqual(text);
  });

  test('Check that the component retrieves the value from the local storage upon mounting', async () => {
    const store = setupStore();
    store.dispatch(updateTerm(text));
    renderWithProviders(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>,
      {
        store,
      }
    );

    const term = localStorage.getItem('searchTerm') ?? '';
    const search = await screen.getByRole<HTMLInputElement>('searchbox');

    await expect(term).toBe(search.value);
  });
});
