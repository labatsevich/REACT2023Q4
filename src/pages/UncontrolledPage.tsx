import { FC, useRef, useState } from 'react';
import UCInput from '../components/Controls/input';
import UCSelect from '../components/Controls/select';
import schemaObject from '../validation/schema';
import { ValidationError } from 'yup';

const UncontrolledPage: FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const age = ageRef.current?.value;
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;
    try {
      const response = await schemaObject.validate(
        {
          name,
          age,
          email,
          password,
        },
        {
          abortEarly: false,
        }
      );
      console.log(response);
    } catch (err) {
      if (err instanceof ValidationError) {
        const _errors: Record<string, string> = {};
        err.inner.forEach((error) => (_errors[error.path!] = error.message));
        setErrors(_errors);
      }
    }
  };

  return (
    <div>
      <form
        className="uc-form"
        ref={formRef}
        method="POST"
        onSubmit={submitHandler}
      >
        <UCInput
          {...{
            label: 'Name',
            name: 'name',
            type: 'text',
            inputRef: nameRef,
            error: errors['name'] ?? '',
          }}
        />
        <UCInput
          {...{
            label: 'Age',
            name: 'age',
            type: 'number',
            inputRef: ageRef,
            error: errors['age'] ?? '',
          }}
        />
        <UCInput
          {...{
            label: 'Email',
            name: 'email',
            type: 'email',
            inputRef: emailRef,
            error: errors['email'] ?? '',
          }}
        />
        <UCInput
          {...{
            label: 'Password',
            name: 'password',
            type: 'password',
            inputRef: passwordRef,
            error: errors['password'] ?? '',
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
