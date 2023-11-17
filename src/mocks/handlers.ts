import { http, HttpResponse } from 'msw';
import { items as data } from './data';
import { IAnime } from '../types';

export const handlers = [
  http.get('https://api.jikan.moe/v4/anime', ({ request }) => {
    const params = new URL(request.url).searchParams;
    if (params.get('q') === 'blabla') {
      return HttpResponse.json({ data: [] as IAnime[] });
    }
    return HttpResponse.json({ data: data });
  }),

  http.get('https://api.jikan.moe/v4/anime/1', () => {
    return HttpResponse.json({ data: data[0] });
  }),
];
