import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useGetDetailsQuery } from '../../api/animeApi';
import { useAppSelector } from '../../hooks';

const Details: FC = () => {
  const { id } = useParams();
  const { idDetailsLoading } = useAppSelector((state) => state.app);
  const { data } = useGetDetailsQuery(+id!);
  const navigate = useNavigate();

  const close = (): void => {
    navigate(-1);
  };

  if (idDetailsLoading) return <Loader />;
  if (data) {
    return (
      <>
        <article className="details">
          <span className="close" onClick={close} title="close">
            &times;
          </span>
          <img src={data.images.jpg.image_url} alt={data.title} width={320} />
          <span>{data.title}</span>
          <span>{data.genre}</span>
          <span>{data.year}</span>
          <p>
            <small>{data.synopsis}</small>
          </p>
        </article>
        <div className="details__overlay" onClick={close}></div>
      </>
    );
  }
};

export default Details;
