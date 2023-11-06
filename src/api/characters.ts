import { IAnime, IAnimeResponse, URLParams } from '../types';

export const getAnime = async (
  endpoints: string,
  params?: URLSearchParams | URLParams
): Promise<IAnimeResponse> => {
  const resource = new URL(endpoints);
  if (params) {
    resource.search = new URLSearchParams(params).toString();
  }
  try {
    const response = await fetch(resource);
    const data = await response.json();
    return data;
  } catch (err: unknown) {
    throw err;
  }
};

export const getDetails = async (
  endpoints: string,
  id: string | undefined
): Promise<IAnime | unknown> => {
  const resource = new URL(`${endpoints}/${id}`);
  try {
    const response = await fetch(resource);
    const data = await response.json();
    return data.data as IAnime;
  } catch (err: unknown) {
    throw err;
  }
};
