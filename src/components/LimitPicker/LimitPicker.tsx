import { ChangeEvent, FC } from 'react';
import './picker.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  updateLimit,
  updatePage,
  updateTerm,
} from '../../store/reducers/appSlice';
import { useSearchParams } from 'react-router-dom';

export const LimitPicker: FC = () => {
  const [searchParams, setsearchParams] = useSearchParams({});
  const search = new URL(window.location.href).searchParams;
  const { limit } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const onLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (search.has('q')) searchParams.set('q', search.get('q') ?? '');
    searchParams.set('limit', e.target.value);
    searchParams.delete('page');
    setsearchParams(searchParams);
    dispatch(updateLimit(+e.target.value));
    dispatch(updatePage(1));
    dispatch(updateTerm(searchParams.get('q') ?? ''));
  };

  return (
    <>
      <div className="picker">
        <label>
          On page:{' '}
          <select value={limit} onChange={onLimitChange}>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
          </select>
        </label>
      </div>
    </>
  );
};
