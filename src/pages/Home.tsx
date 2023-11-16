import { FC, useEffect, useState } from 'react';
import Searchbar from '../components/Searchbar/Searchbar';
import Pane from '../components/Pane/Pane';
import { PaginationType } from '../types';
import Loader from '../components/Loader/Loader';
import { Pagination } from '../components/Pagination/Pagination';
import { LimitPicker } from '../components/LimitPicker/LimitPicker';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useAnimeListQuery } from '../api/animeApi';
import { setItems } from '../store/reducers/appSlice';

const Home: FC = () => {
  const { term, limit, currentPage, isLoading } = useAppSelector(
    (state) => state.app
  );
  const dispatch = useAppDispatch();
  const { data } = useAnimeListQuery({
    q: term,
    limit,
    page: currentPage,
  });
  const [pager, setPager] = useState<PaginationType | undefined>();

  useEffect(() => {
    if (data) {
      setPager(data.pagination);
      dispatch(setItems(data.data));
    }
  }, [data]);

  return (
    <>
      <Searchbar />
      <LimitPicker />
      <section className="characters">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data?.pagination ? (
              <Pagination
                hasNext={pager?.has_next_page ?? false}
                current={currentPage}
                total={pager?.last_visible_page ?? 1}
              />
            ) : (
              ''
            )}
            <Pane />
          </>
        )}
      </section>
    </>
  );
};

export default Home;
