import { FC } from 'react';

type PropsType = {
  label: string;
  name: string;
  inputRef: React.RefObject<HTMLSelectElement>;
  options: Array<string>;
  error?: string;
};

const UCSelect: FC<PropsType> = ({ label, name, inputRef, options, error }) => {
  return (
    <label htmlFor={name.toLocaleLowerCase()} className="control-label">
      {label}
      <select name={name} ref={inputRef}>
        {options.map((opt, index) => (
          <option key={opt} value={index === 0 ? '' : opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <span className="control-error">{error}</span>}
    </label>
  );
};

export default UCSelect;
