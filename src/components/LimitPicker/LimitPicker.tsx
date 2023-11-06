import { ChangeEvent, FC } from 'react';
import { URLParams } from '../../types';
import './picker.scss';

type PickerType = {
  setsearchParams: (params: URLSearchParams | URLParams) => void;
  setLimit: (limit: number) => void;
  limit: number;
};

export const LimitPicker: FC<PickerType> = ({
  setsearchParams,
  setLimit,
  limit,
}) => {
  const search = new URL(window.location.href).searchParams;

  const onLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(+e.target.value);
    const params: URLParams = {};
    if (search.has('q')) params.q = search.get('q') ?? '';
    params.limit = e.target.value;

    setsearchParams(params);
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
