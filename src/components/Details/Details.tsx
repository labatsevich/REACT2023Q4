import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetails } from '../../api/characters';
import { IAnime } from '../../types';
import Loader from '../Loader/Loader';

const Details: FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { id } = useParams();
  const [details, setDetails] = useState<IAnime | undefined>();
  const navigate = useNavigate();

  const close = (): void => {
    navigate(-1);
  };

  useEffect(() => {
    setTimeout(async () => {
      (async () => {
        const data = await getDetails('https://api.jikan.moe/v4/anime', id);

        if (data) {
          setDetails(data as IAnime);
          setLoaded(true);
        }
      })();
    }, 500);
  }, []);

  return (
    <>
      <article className="details">
        {!loaded ? (
          <Loader />
        ) : (
          details && (
            <>
              <span className="close" onClick={close}>
                &times;
              </span>
              <img
                src={details.images.webp.image_url}
                alt={details.title}
                width={320}
              />
              <span>{details.title}</span>
              <span>{details.genre}</span>
              <span>{details.year}</span>
              <p>
                <small>{details.synopsis}</small>
              </p>
            </>
          )
        )}
      </article>
      <div className="details__overlay" onClick={close}></div>
    </>
  );
};

export default Details;
