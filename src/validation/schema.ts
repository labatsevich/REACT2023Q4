import * as yup from 'yup';

const schemaObject = yup.object().shape({
  name: yup
    .string()
    .required('name is required')
    .min(8, 'the name must have at least 8 characters')
    .max(20, 'the name must have no more than 20 characters')
    .matches(/^[A-ZА-Я]/, 'first letter must be uppercase'),
  age: yup
    .number()
    .required('age is required')
    .positive('age cannot be less than 0')
    .min(18, 'your age must be not less than 18 years'),
  email: yup
    .string()
    .required('email is required')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: 'must be a valid email',
    }),
  password: yup
    .string()
    .required('password required')
    .min(8, 'must have at least 8 characters')
    .matches(/[A-ZА-ЯЁ]/, 'must have at least one uppercase letter')
    .matches(/[a-zа-яё]/, 'must have at least one lowercase letter')
    .matches(/[0-9]/, 'must have at least one digit')
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
      'must have at least one special character (@#$%^&* etc.)'
    ),
});

export default schemaObject;
