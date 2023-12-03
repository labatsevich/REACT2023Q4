import { FC } from 'react';

type PropsType = {
  label: string;
  name: string;
  type: string;
  inputRef: React.RefObject<HTMLInputElement>;
  error?: string;
  onFocus: () => void;
};

const UCInput: FC<PropsType> = ({
  label,
  name,
  type,
  inputRef,
  error,
  onFocus,
}) => {
  return (
    <label
      htmlFor={name.toLocaleLowerCase()}
      className={!error ? 'control-label' : 'control-label error'}
    >
      {label}
      <input
        type={type}
        name={name.toLocaleLowerCase()}
        ref={inputRef}
        onFocus={onFocus}
      />
      {error && <span className="message-error">{error}</span>}
    </label>
  );
};

export default UCInput;
