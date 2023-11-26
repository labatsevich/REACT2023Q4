
type Items = {
    count: number;
    total: number;
    per_page: number;
  };
  
  export type PaginationType = {
    last_visible_page: number;
    has_next_page: boolean;
    current_page?: number;
    items: Items;
  };
  
  type Images = {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
  export interface IAnime {
    mal_id: number;
    title: string;
    url: string;
    approved: boolean;
    images: {
      jpg: Images;
      webp: Images;
    };
    genre: string;
    synopsis: string;
    year: number | null;
  }
  
  export interface IAnimeResponse {
    data: IAnime[];
    pagination: PaginationType;
  }

  export type MixedAnimeResponse = {
    anime: IAnimeResponse,
    details: IAnime | null 
  }