import { ChangeEvent, FormEvent, useEffect, FC, useState } from 'react';
import './searchbar.scss';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateTerm } from '../../store/reducers/appSlice';

export interface SearchProps {
  onChangeQuery: (query: string) => void;
}

const Searchbar: FC = () => {
  const { term } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>(term);

  const [searchParams, setsearchParams] = useSearchParams({});

  const handleSubmit = (
    e: FormEvent<HTMLFormElement | HTMLButtonElement>
  ): void => {
    e.preventDefault();
    const params: Record<string, string> = {};
    if (term) params.q = term;
    if (searchParams.has('page')) searchParams.delete('page');
    setsearchParams(params);
    dispatch(updateTerm(search));
  };

  useEffect(() => {
    localStorage.setItem('searchTerm', term);
  }, [term]);

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
