import { FC } from 'react';

type PropsType = {
  label: string;
  name: string;
  type: string;
  inputRef: React.RefObject<HTMLInputElement>;
  error?: string;
};

const UCInput: FC<PropsType> = ({ label, name, type, inputRef, error }) => {
  return (
    <label htmlFor={name.toLocaleLowerCase()} className="control-label">
      {label}
      <input type={type} name={name.toLocaleLowerCase()} ref={inputRef} />
      {error && <span className="control-error">{error}</span>}
    </label>
  );
};

export default UCInput;
