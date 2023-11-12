import { http, HttpResponse } from 'msw';
import { items as data } from './data';

export const handlers = [
  http.get('https://api.jikan.moe/v4/anime/1', () => {
    return HttpResponse.json({ data: data[0] });
  }),
];
