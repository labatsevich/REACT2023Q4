import { IAnime } from "@/types";
import Image from "next/image";

const Details = (data:IAnime) => {

  const close = (): void => {
    
  };

  if (data) {
    return (
      <>
        <article className="details">
          <span className="close" onClick={close} title="close">
            &times;
          </span>
          <Image src={data.images.webp.image_url} width={200} height={320} alt={data.title} /> 
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