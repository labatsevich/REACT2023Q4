import { ChangeEvent, FormEvent, useEffect, FC, useState } from 'react';
import styles from '../../styles/searchbar.module.scss';
import { useRouter } from 'next/router';

export const Searchbar: FC = () => {

  const router = useRouter();
  const { query } = router;
  const [search, setSearch] = useState<string>((query.q ?? '').toString());

  const handleSubmit = (
    e: FormEvent<HTMLFormElement | HTMLButtonElement>
  ): void => {
    e.preventDefault();
    delete query.id;
    router.push({query: {q:search, limit:query.limit || 25,  page: 1}});
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <form method="GET" onSubmit={handleSubmit}>
      <div className={styles.search}>
        <input type="search" value={search} onChange={handleChange} name="q" className={styles.search__input} />
        <button type="submit" className={styles.search__button}>Search</button>
      </div>
    </form>
  );
};
