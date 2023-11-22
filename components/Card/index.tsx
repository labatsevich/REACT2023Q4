import { IAnime } from "@/types";
import Link from "next/link";
import Image from "next/image";
import styles from '@/styles/pane.module.scss';

interface ICardProps {
  item:IAnime;
}

const Card =  ({item}: ICardProps) => {
  return (
    <Link href={`details/${item.mal_id}`}>
      <div className={styles.cards__item} key={item.mal_id}>
        <Image src={item.images.jpg.image_url} width={200} height={240} alt={item.title}/> 
        <p>{item.title}</p>
      </div>
    </Link>
  );
};

export default Card;