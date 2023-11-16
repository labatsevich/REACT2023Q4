import { FC } from 'react';
import './pane.scss';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import Card from '../Card/Card';

const Pane: FC = () => {
  const { items } = useAppSelector((state) => state.app);

  if (!items.length) return <div>Nothing found</div>;

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
