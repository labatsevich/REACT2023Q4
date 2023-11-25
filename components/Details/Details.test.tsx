import { describe, test, expect} from 'vitest';
import Card from '../Card';
import { items } from '../../mocks/data';
import { render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { mockedRouter } from '@/mocks/mockedRouter';

describe('Tests for the Detailed Card component',() => {

  test('Ensure that the card component renders the relevant card data', () => {
  
    const data = items[0];
    render(
      <RouterContext.Provider value={mockedRouter({})}>
        <Card item={data} />
      </RouterContext.Provider>
    );

    expect(screen.getByText(data.title)).toBeInTheDocument();
    expect(screen.getByRole('img').getAttribute('alt')).toEqual(data.title);

  })

})