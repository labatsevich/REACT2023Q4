import { describe, expect, test } from 'vitest';
import { Searchbar } from '../Searchbar/index';
import { screen, waitFor } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { mockedRouter } from '@/mocks/mockedRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { render } from '@testing-library/react';

const text = 'Cowboy';

describe('Tests for the Search component', () => {

  const router_ = mockedRouter({});

  test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    userEvent.setup();

    render(
      <RouterContext.Provider value={router_}>
        <Searchbar />
      </RouterContext.Provider>
    );

    const search = screen.getByRole('searchbox');
    const btn = screen.getByRole('button');
    await act(async () => {
      await userEvent.type(search, text);
      await userEvent.click(btn);
    });

    await waitFor(() => {
      
      expect(router_.push).toBeCalledWith({query: {
        q:text, limit:25, page:1
      }})
    })


  })
    
  });