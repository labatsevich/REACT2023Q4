import { useRef } from 'react';
import styles from '../../styles/searchbar.module.scss';
import { useRouter } from 'next/router';

export const Searchbar = () => {

  const router = useRouter();
  const { query } = router;
  const inputRef = useRef<HTMLInputElement>(null);
  

  const handleSubmit = (): void => {
    const search = inputRef.current?.value.trim() ?? '';
    delete query.id;
    router.push({query: {q:search, limit:query.limit ?? 25,  page: 1}});
  };


  return (
    <form method="GET" onSubmit={handleSubmit}>
      <div className={styles.search}>
        <input type="search"  ref={inputRef} defaultValue={query.q} name="q" className={styles.search__input} />
        <button type="submit" className={styles.search__button}>Search</button>
      </div>
    </form>
  );
};
