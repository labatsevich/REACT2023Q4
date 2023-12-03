import { FC, useRef, useState } from 'react';
import UCInput from '../components/Controls/input';
import UCSelect from '../components/Controls/select';
import schemaObject from '../validation/schema';
import { ValidationError } from 'yup';
import { useAppDispatch, useAppSelector } from '../hooks';
import { insertAccount } from '../store/reducers/appSlice';
import { useNavigate } from 'react-router-dom';

const UncontrolledPage: FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [disabled, setDisabled] = useState<boolean>(false);
  const { countries } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(`Error: ${error}`);
    });

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmpasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const tcRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countriesRef = useRef<HTMLSelectElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const age = ageRef.current?.value;
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;
    const confirm = confirmpasswordRef.current?.value;
    const tc = tcRef.current?.checked;
    const gender = genderRef.current?.value;
    const avatar = pictureRef.current?.files?.item(0) ?? null;
    const country = countriesRef.current?.value;

    try {
      const response = await schemaObject.validate(
        {
          name,
          age,
          email,
          password,
          confirm,
          tc,
          avatar,
          gender,
          country,
        },
        {
          abortEarly: false,
        }
      );

      setErrors({});

      let encoded;
      if (avatar) {
        await getBase64(avatar)
          .then((result) => {
            encoded = result?.toString();
          })
          .catch((e) => console.log(e));
      }
      delete response.avatar;
      const profile = { ...response, avatar: encoded };

      dispatch(insertAccount(profile));
      navigate('/', { state: { from: 'uncontrolled' } });
    } catch (err) {
      if (err instanceof ValidationError) {
        const _errors: Record<string, string> = {};
        err.inner.forEach((error) => (_errors[error.path!] = error.message));
        setErrors(_errors);
        setDisabled(true);
      }
    }
  };

  const focusHandler = () => {
    setDisabled(false);
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
            onFocus: focusHandler,
          }}
        />
        <UCInput
          {...{
            label: 'Age',
            name: 'age',
            type: 'number',
            inputRef: ageRef,
            error: errors['age'] ?? '',
            onFocus: focusHandler,
          }}
        />
        <UCInput
          {...{
            label: 'Email',
            name: 'email',
            type: 'email',
            inputRef: emailRef,
            error: errors['email'] ?? '',
            onFocus: focusHandler,
          }}
        />
        <UCInput
          {...{
            label: 'Password',
            name: 'password',
            type: 'password',
            inputRef: passwordRef,
            error: errors['password'] ?? '',
            onFocus: focusHandler,
          }}
        />
        <UCInput
          {...{
            label: 'Confirm password',
            name: 'confirm',
            type: 'password',
            inputRef: confirmpasswordRef,
            error: errors['confirm'] ?? '',
            onFocus: focusHandler,
          }}
        />
        <UCInput
          {...{
            label: 'T & C',
            name: 'tc',
            type: 'checkbox',
            inputRef: tcRef,
            error: errors['tc'] ?? '',
            onFocus: focusHandler,
          }}
        />
        <UCInput
          {...{
            label: 'Profile image',
            name: 'avatar',
            type: 'file',
            inputRef: pictureRef,
            error: errors['avatar'] ?? '',
            onFocus: focusHandler,
          }}
        />
        <UCSelect
          {...{
            label: 'Gender',
            name: 'gender',
            inputRef: genderRef,
            options: ['select gender', 'male', 'female'],
            error: errors['gender'] ?? '',
          }}
        />
        <UCSelect
          {...{
            label: 'Contry',
            name: 'country',
            inputRef: countriesRef,
            options: [...countries],
            error: errors['country'] ?? '',
          }}
        />
        <br />
        <button type="submit" disabled={disabled}>
          Create account
        </button>
      </form>
    </div>
  );
};

export default UncontrolledPage;
