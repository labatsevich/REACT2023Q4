import { ChangeEvent, FC } from 'react';
import { URLParams } from '../../types';
import './picker.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateLimit } from '../../store/reducers/appSlice';

export const LimitPicker: FC = () => {
  const search = new URL(window.location.href).searchParams;
  const { limit } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const onLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateLimit(+e.target.value));
    const params: URLParams = {};
    if (search.has('q')) params.q = search.get('q') ?? '';
    params.limit = e.target.value;
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
