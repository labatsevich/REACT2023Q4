import { http, HttpResponse } from 'msw';
import { items as data } from './data';

export const handlers = [
  http.get('https://api.jikan.moe/v4/anime/5', () => {
    console.log(data);
    return HttpResponse.json({ data: data[1] });
  }),
];
