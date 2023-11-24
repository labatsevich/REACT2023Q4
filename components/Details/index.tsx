import { IAnime } from "@/types";
import Image from "next/image";
import styles from '@/styles/pane.module.scss';
import { useRouter } from "next/router";

const Details = (data:IAnime) => {

  const router = useRouter();
  const {query} = router;

  const close = (): void => {
    delete query.id;
    router.push({query: {...query}});
  };

  if (data) {
    return (
      <>
        <article className={styles.details}>
          <span className={styles.close} onClick={close} title="close">
            &times;
          </span>
          <Image src={data.images.webp.image_url} width={320} height={400} alt={data.title} objectFit="fill"/> 
          <span>{data.title}</span>
          <span>{data.genre}</span>
          <span>{data.year}</span>
          <p>
            <small>{data.synopsis}</small>
          </p>
        </article>
        <div className={styles.details__overlay} onClick={close}></div>
      </>
    );
  }
};

export default Details;