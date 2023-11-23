import styles from '@/styles/pagination.module.scss';
import { useRouter } from 'next/router';

interface IPaginationProps {
    hasNext: boolean;
    current: number;
    total: number;
}

const Pagination = ({hasNext, current, total }:IPaginationProps) => {

    const router = useRouter();
    const { query  } = router

    const nextPage = () => {
        if(current < total )
        delete query.id;
        router.push({query: {...query, page: current + 1}});
      };
    
      const prevPage = () => {
        if (current > 1) {
            delete query.id;
            router.push({query: {...query, page: current - 1}});
        }
      };

    return (
        <div className={styles.pagination}>
        <button onClick={prevPage} disabled={current === 1} className={styles.prev} title="prev page">
          &larr;
        </button>
        <span>
          page <strong>{current}</strong> of {total}
        </span>
        <button onClick={nextPage} disabled={!hasNext} className={styles.next} title="next page">
          &rarr;
        </button>
      </div>
    )
}

export default Pagination;