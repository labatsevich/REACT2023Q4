import { FC, useRef } from 'react';
import UCInput from '../components/Controls/input';
import UCSelect from '../components/Controls/select';

const UncontrolledPage: FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmpasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const tcRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLImageElement>(null);
  const countriesRef = useRef<HTMLSelectElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div>
      <form className="uc-form" ref={formRef} method="POST">
        <UCInput
          {...{
            label: 'Name',
            name: 'name',
            type: 'text',
            inputRef: nameRef,
          }}
        />
        <UCInput
          {...{
            label: 'Age',
            name: 'age',
            type: 'number',
            inputRef: ageRef,
          }}
        />
        <UCInput
          {...{
            label: 'Email',
            name: 'email',
            type: 'email',
            inputRef: emailRef,
          }}
        />
        <UCInput
          {...{
            label: 'Password',
            name: 'password',
            type: 'password',
            inputRef: passwordRef,
          }}
        />
        <UCInput
          {...{
            label: 'Confirm password',
            name: 'confirm',
            type: 'password',
            inputRef: confirmpasswordRef,
          }}
        />
        <UCInput
          {...{
            label: 'T & C',
            name: 'tc',
            type: 'checkbox',
            inputRef: tcRef,
          }}
        />
        <UCSelect
          {...{
            label: 'Gender',
            name: 'gender',
            inputRef: genderRef,
            options: ['select gender', 'male', 'female'],
          }}
        />
        <button type="submit">Create account</button>
      </form>
    </div>
  );
};

export default UncontrolledPage;
