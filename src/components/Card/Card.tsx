import { Link } from 'react-router-dom';
import { IAnime } from '../../types';
import { FC } from 'react';

const Card: FC<IAnime> = (item: IAnime) => {
  return (
    <Link to={`details/${item.mal_id}`}>
      <div className="cards__item" key={item.mal_id}>
        <img src={item.images.webp.image_url} alt={item.title} />
        <p>{item.title}</p>
      </div>
    </Link>
  );
};

export default Card;
