import { Fragment } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Button from '../../components/Button';
import ComponentWrapper from '../../components/ComponentWrapper';
import FormInput from '../../components/Form/FormInput';
import { StyledForm, Logo, StyledLink } from './style';
import lockImage from '../../assets/lock.svg';
import { useCreateUserMutation } from '../../redux/apiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { VALIDATION_DIGITS_AND_LETTERS_ONLY } from './constants';
import { setNotification } from '../../redux/slice';

const Authorization = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // Определяем, в каком режиме находимся авторизации или регистрации
  let isSignupMode = false;

  if (location.pathname === '/signup') {
    isSignupMode = true;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>();

  const [createUser] = useCreateUserMutation();

  const onSubmitHandler = (data: FieldValues) => {
    console.log(data);
    const user = {
      username: data.username,
      password: data.password,
    };

    isSignupMode
      ? createUser(user)
          .unwrap()
          .then(() => {
            dispatch(setNotification({ message: 'User created', type: 'success', id: uuidv4() }));
            navigate('/contacts');
          })
          .catch((error) => {
            dispatch(setNotification({ message: error.error, type: 'error', id: uuidv4() }));
          })
      : null;
  };
  return (
    // isLoading={isLoading} добавить
    <ComponentWrapper>
      <StyledForm onSubmit={handleSubmit(onSubmitHandler)}>
        <Logo src={lockImage} />
        <div>
          <FormInput
            name={'username'}
            label={'Username'}
            register={register}
            rules={{
              required: 'You must enter your username',
              minLength: { value: 4, message: 'Username length must be between 4 and 15' },
              maxLength: { value: 15, message: 'Username length must be between 4 and 15' },
              pattern: {
                value: VALIDATION_DIGITS_AND_LETTERS_ONLY,
                message: 'Username must contain digits ans english letters only',
              },
            }}
            errors={errors}
          />
          <FormInput
            name={'password'}
            label={'Password'}
            register={register}
            rules={{
              required: 'You must enter your password',
              minLength: { value: 6, message: 'Password length must be between 6 and 15' },
              maxLength: { value: 15, message: 'Password length must be between 6 and 15' },
              pattern: {
                value: VALIDATION_DIGITS_AND_LETTERS_ONLY,
                message: 'Password must contain digits ans letters only',
              },
            }}
            errors={errors}
          />
        </div>
        {isSignupMode ? (
          <Button label="sign up" type="submit" />
        ) : (
          <Fragment>
            <Button label="sign in" type="submit" />
            <StyledLink
              onClick={() => {
                navigate('/signup');
              }}
            >
              Don&apos;t have an account? Sign up
            </StyledLink>
          </Fragment>
        )}
      </StyledForm>
    </ComponentWrapper>
  );
};

export default Authorization;
