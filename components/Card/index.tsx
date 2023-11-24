import { IAnime } from "@/types";
import Image from "next/image";
import styles from '@/styles/pane.module.scss';
import { useRouter } from "next/router";

interface ICardProps {
  item:IAnime;
}

const Card =  ({item}: ICardProps) => {

  const router = useRouter();
  const { query } = router;

  const showDetails = (id: number) => {
    router.push({query:{...query, id }})
  }

  return (
      <div className={styles.cards__item} key={item.mal_id} onClick={ () => showDetails(item.mal_id)}>
        <Image src={item.images.jpg.image_url} width={200} height={240} alt={item.title}/> 
        <p className={styles.cards__item_title}>{item.title}</p>
        <p className={styles.cards__item_year}>{item.year}</p>
      </div>
  );
};

export default Card;