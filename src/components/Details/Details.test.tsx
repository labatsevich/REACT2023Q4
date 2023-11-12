import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from './Details';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Tests for the Detailed Card component', () => {
  test('Check that a loading indicator is displayed while fetching data', () => {
    render(
      <MemoryRouter initialEntries={['/details/5']}>
        <Routes>
          <Route path="details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTitle('loading')).toBeVisible();
  });
});
