import { describe, test, expect} from 'vitest';
import Details from '../Details';
import { items } from '../../mocks/data';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { mockedRouter } from '@/mocks/mockedRouter';
import Home from '@/pages';
import { MixedAnimeResponse } from '@/types';

describe('Tests for the Details Card component',() => {

  test('Make sure the detailed card component correctly displays the detailed card data', () => {
  
    const data = items[0];
    render(
      <RouterContext.Provider value={mockedRouter({
        query: {id:'1'}
      })}>
        <Details {...data} />
      </RouterContext.Provider>
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByTitle('close')).toBeInTheDocument();
  })


  test('Ensure that clicking the close button hides the component', () => {

    const mockedData:MixedAnimeResponse = {
      anime: {
        data: items,
        pagination: {
          last_visible_page: 1,
          has_next_page: false,
          current_page: 1,
          items: {
            count: 10,
            total: 1,
            per_page: 25,
          }
        }
    },
    details: items[0]
    }
    
    waitFor(() => render(
      <RouterContext.Provider value={mockedRouter({
        query: {id:'1'}
      })}>
        <Home data={mockedData} />
      </RouterContext.Provider>
    ));

    waitFor(() => {
      const details = screen.getByRole('article');
      expect(details).toBeInTheDocument();
      const btn = screen.getByTitle('close');
      fireEvent.click(btn);
    });

    waitFor(() => render(
      <RouterContext.Provider value={mockedRouter({})}>
        <Home data={mockedData} />
      </RouterContext.Provider>
    ));
  
    waitFor(() => {
      const details = screen.getByRole('article');
      expect(details).not.toBeInTheDocument();
    });

  })


})