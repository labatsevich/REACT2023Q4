import { ChangeEvent, FormEvent, useEffect, FC } from 'react';
import './searchbar.scss';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContextProvider';

export interface SearchProps {
  onChangeQuery: (query: string) => void;
}

const Searchbar: FC<SearchProps> = ({ onChangeQuery }: SearchProps) => {
  const { term, setTerm } = useAppContext();

  const [searchParams, setsearchParams] = useSearchParams({});

  const handleSubmit = (
    e: FormEvent<HTMLFormElement | HTMLButtonElement>
  ): void => {
    e.preventDefault();
    const params: Record<string, string> = {};
    if (term) params.q = term;
    if (searchParams.has('page')) searchParams.delete('page');
    setsearchParams(params);
    onChangeQuery(term);
  };

  useEffect(() => {
    localStorage.setItem('searchTerm', term);
  }, [term]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setTerm(value);
  };

  return (
    <form method="GET" onSubmit={handleSubmit}>
      <div className="search">
        <input type="search" value={term} onChange={handleChange} name="q" />
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default Searchbar;
