import { describe, expect, test } from 'vitest';
import { renderWithProviders } from '../../test_utils';
import { BrowserRouter } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';
import { Pagination } from './Pagination';
import { server } from '../../mocks/server';
import { setupStore } from '../../store';
import { act } from '@testing-library/react';

describe('Tests for the Pagination component', () => {
  test('Make sure the component updates URL query parameter when page changes', async () => {
    const store = setupStore();
    server.listen();
    userEvent.setup();

    renderWithProviders(
      <BrowserRouter>
        <Pagination hasNext={true} current={1} total={1706} />
      </BrowserRouter>,
      {
        store,
      }
    );
    const btnNext = screen.getByTitle('next page');
    await act(() => userEvent.click(btnNext));

    waitFor(() => {
      const params = new URL(window.location.href).searchParams;
      const page = params.get('page');
      expect(page).toEqual(2);
    });

    server.close();
  });
});
