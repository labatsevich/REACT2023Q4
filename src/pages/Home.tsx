import { FC, useEffect, useState } from 'react';
import Searchbar from '../components/Searchbar/Searchbar';
import Pane from '../components/Pane/Pane';
import { PaginationType, URLParams } from '../types';
import Loader from '../components/Loader/Loader';
import { getAnime } from '../api/characters';
import { Pagination } from '../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { LimitPicker } from '../components/LimitPicker/LimitPicker';
import { useAppContext } from '../context/AppContextProvider';

const Home: FC = () => {
  const { term, data, setData } = useAppContext();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [searchParams, setsearchParams] = useSearchParams({
    q: term ?? '',
  });
  const [pager, setPager] = useState<PaginationType | undefined>(undefined);
  const [currentPage, setCurrenPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(25);

  const nextPage = () => {
    setCurrenPage(currentPage + 1);
    searchParams.set('page', '' + (currentPage + 1));
    setsearchParams(searchParams);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrenPage(currentPage - 1);
      searchParams.set('page', '' + (currentPage - 1));
      setsearchParams(searchParams);
    }
  };

  useEffect(() => {
    setLoaded(false);
    setTimeout(async () => {
      const { data, pagination } = await getAnime(
        'https://api.jikan.moe/v4/anime',
        searchParams
      );
      setData(data);
      setPager(pagination);
      setCurrenPage(pagination.current_page ?? 1);
      setLoaded(true);
    }, 1000);
  }, [currentPage, limit]);

  const searchData = (query: string) => {
    const params: URLParams = {};

    if (query) params.q = query;
    params.limit = '' + limit;

    setCurrenPage(1);
    setLoaded(false);
    setTimeout(
      async () => {
        const { data, pagination } = await getAnime(
          'https://api.jikan.moe/v4/anime',
          params
        );
        setData(data);
        setPager(pagination);
        searchParams.set('page', pagination.current_page?.toString() ?? '1');
        setLoaded(true);
      },
      1000,
      query
    );
  };

  return (
    <>
      <Searchbar onChangeQuery={searchData} />
      <LimitPicker
        setsearchParams={setsearchParams}
        setLimit={setLimit}
        limit={limit}
      />
      <section className="characters">
        {!loaded ? (
          <Loader />
        ) : (
          <>
            {pager && (
              <Pagination
                prevPage={prevPage}
                nextPage={nextPage}
                hasNext={pager.has_next_page}
                current={pager.current_page ?? 1}
                total={pager.last_visible_page ?? 1}
              />
            )}
            {data && <Pane items={data} />}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
