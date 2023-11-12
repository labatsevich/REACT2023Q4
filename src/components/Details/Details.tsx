import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetails } from '../../api/characters';
import { IAnime } from '../../types';
import Loader from '../Loader/Loader';
import { useAppContext } from '../../context/AppContextProvider';

const Details: FC = () => {
  const { loaded, setLoaded } = useAppContext();
  const { id } = useParams();
  const [details, setDetails] = useState<IAnime | undefined>();
  const navigate = useNavigate();

  const close = (): void => {
    setLoaded(false);
    navigate(-1);
  };

  useEffect(() => {
    (async () => {
      const data = await getDetails('https://api.jikan.moe/v4/anime', id);

      if (data) {
        setDetails(data as IAnime);
        setLoaded(true);
      }
    })();
  }, [id]);

  if (!loaded) return <Loader />;
  if (details) {
    return (
      <>
        <article className="details">
          <span className="close" onClick={close} title="close">
            &times;
          </span>
          <img
            src={details.images.jpg.image_url}
            alt={details.title}
            width={320}
          />
          <span>{details.title}</span>
          <span>{details.genre}</span>
          <span>{details.year}</span>
          <p>
            <small>{details.synopsis}</small>
          </p>
        </article>
        <div className="details__overlay" onClick={close}></div>
      </>
    );
  }
};

export default Details;
