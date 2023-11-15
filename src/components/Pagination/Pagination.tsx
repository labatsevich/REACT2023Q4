import { FC } from 'react';
import './pagination.scss';
import { useAppDispatch } from '../../hooks';
import { useSearchParams } from 'react-router-dom';
import { updatePage } from '../../store/reducers/appSlice';

interface PagerProps {
  hasNext: boolean;
  current: number;
  total: number;
}

export const Pagination: FC<PagerProps> = ({ hasNext, current, total }) => {
  const dispatch = useAppDispatch();
  const [searchParams, setsearchParams] = useSearchParams({});

  const nextPage = () => {
    dispatch(updatePage(current + 1));
    searchParams.set('page', '' + (current + 1));
    setsearchParams(searchParams);
  };

  const prevPage = () => {
    if (current > 1) {
      dispatch(updatePage(current - 1));
      searchParams.set('page', '' + (current - 1));
      setsearchParams(searchParams);
    }
  };

  return (
    <>
      <div className="pagination">
        <button onClick={prevPage} disabled={current === 1} title="prev page">
          &larr;
        </button>
        <span>
          page <strong>{current}</strong> of {total}
        </span>
        <button onClick={nextPage} disabled={!hasNext} title="next page">
          &rarr;
        </button>
      </div>
    </>
  );
};
