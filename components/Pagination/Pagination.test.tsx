import { describe, expect, test } from 'vitest';
import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';
import  Pagination  from '../Pagination/index';
import { act, render } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { mockedRouter } from '@/mocks/mockedRouter';

describe('Tests for the Pagination component', () => {
  const router_ = mockedRouter({
    query: {
      q: '',
      limit: '25',
      page: '1',
    }
  });
  test('Make sure the component updates URL query parameter when page changes', async () => {

    userEvent.setup();
    await act(() => render(
      <RouterContext.Provider value={router_}>
        <Pagination hasNext={true} current={1} total={1706} />
      </RouterContext.Provider>
      ));

    const btnNext = screen.getByTitle('next page');
    await act(() => userEvent.click(btnNext));

      expect(router_.push).toBeCalledWith({
        query: {q: '', limit:"25", page: 2}
      })

  });
});