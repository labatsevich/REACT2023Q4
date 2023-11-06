import { FC } from 'react';
import './pagination.scss';

interface PagerProps {
  nextPage: () => void;
  prevPage: () => void;
  hasNext: boolean;
  current: number;
  total: number;
}

export const Pagination: FC<PagerProps> = ({
  prevPage,
  nextPage,
  hasNext,
  current,
  total,
}) => {
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
