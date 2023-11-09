import { FC } from 'react';
import './pane.scss';
import { Link, Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContextProvider';

const Pane: FC = () => {
  const { data } = useAppContext();
  return (
    <>
      <div className="cards" onClick={close}>
        {data.map((item) => (
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
