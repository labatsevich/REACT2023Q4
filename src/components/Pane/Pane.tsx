import { FC } from 'react';
import { IAnime } from '../../types';
import './pane.scss';
import { Link, Outlet } from 'react-router-dom';
interface PaneProps {
  items: IAnime[];
}
const Pane: FC<PaneProps> = ({ items }: PaneProps) => {
  return (
    <>
      <div className="cards" onClick={close}>
        {items.map((item) => (
          <Link to={`details/${item.mal_id}`} key={item.mal_id}>
            <div className="cards__item">
              <img src={item.images.webp.image_url} alt={item.title} />
              <p>{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default Pane;
