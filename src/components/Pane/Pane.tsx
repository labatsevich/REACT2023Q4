import { FC } from 'react';
import './pane.scss';
import { Outlet } from 'react-router-dom';
import Card from '../Card/Card';
import { useAnimeListQuery } from '../../api/animeApi';
import { useAppSelector } from '../../hooks';

const Pane: FC = () => {
  const { term, limit, currentPage } = useAppSelector((state) => state.app);
  const { data } = useAnimeListQuery({ q: term, limit, page: currentPage });
  const items = data?.data;
  if (!items?.length) return <div>Nothing found</div>;

  return (
    <>
      <div className="cards" onClick={close}>
        {items.map((item) => (
          <Card {...item} key={item.mal_id} />
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default Pane;
