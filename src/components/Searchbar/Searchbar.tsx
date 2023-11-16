import { ChangeEvent, FormEvent, useEffect, FC, useState } from 'react';
import './searchbar.scss';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updatePage, updateTerm } from '../../store/reducers/appSlice';

export interface SearchProps {
  onChangeQuery: (query: string) => void;
}

const Searchbar: FC = () => {
  const dispatch = useAppDispatch();
  const { term } = useAppSelector((state) => state.app);
  const [search, setSearch] = useState<string>(term);
  const [searchParams, setsearchParams] = useSearchParams({});

  const handleSubmit = (
    e: FormEvent<HTMLFormElement | HTMLButtonElement>
  ): void => {
    e.preventDefault();
    const params: Record<string, string> = {};
    if (search) params.q = search;
    if (searchParams.has('page')) searchParams.delete('page');
    dispatch(updateTerm(search ?? ''));
    dispatch(updatePage(1));
    setsearchParams(params);
  };

  useEffect(() => {
    localStorage.setItem('searchTerm', search);
  }, [search]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <form method="GET" onSubmit={handleSubmit}>
      <div className="search">
        <input type="search" value={search} onChange={handleChange} name="q" />
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default Searchbar;
