import { describe, expect, test } from 'vitest';
import { renderWithProviders } from '../../test_utils';
import Searchbar from './Searchbar';
import { screen } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Tests for the Search component', () => {
  test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const text = 'Cowboy';
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
    const term = localStorage.getItem('searchItem') ?? '';

    renderWithProviders(
      <BrowserRouter>
        <Searchbar />
      </BrowserRouter>
    );

    const search = screen.getByRole<HTMLInputElement>('searchbox');

    expect(term).toBe(search.value);
  });
});
