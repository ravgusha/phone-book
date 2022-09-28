import { Fragment } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Button from '../../components/Button';
import ComponentWrapper from '../../components/ComponentWrapper';
import FormInput from '../../components/Form/FormInput';
import { StyledForm, Logo, StyledLink } from './style';
import lockImage from '../../assets/lock.svg';
import { useCreateUserMutation, useLoginUserMutation } from '../../redux/apiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  VALIDATION_DIGITS_AND_LETTERS_ONLY,
  VALIDATION_EMAIL,
  VALIDATION_LETTERS_ONLY,
} from './constants';
import { setNotification } from '../../redux/notificationSlice';
import { setUserInformation } from '../../redux/userSlice';

const theme = {
  h: 'calc(100vh - 53px)',
  jc: 'center',
  mg: '0 auto',
};

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
  const [loginUser] = useLoginUserMutation();

  const onSubmitHandler = (data: FieldValues) => {
    console.log(data);
    const user = {
      name: data.name,
      email: data.email,
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
            dispatch(setNotification({ message: error.data, type: 'error', id: uuidv4() }));
          })
      : loginUser(user)
          .unwrap()
          .then((response) => {
            if (response.accessToken) {
              dispatch(setUserInformation(response));
              localStorage.setItem('token', JSON.stringify(response.accessToken));
            }
            navigate('/contacts');
            dispatch(
              setNotification({
                message: 'You are successfully logged in',
                type: 'success',
                id: uuidv4(),
              })
            );
          })
          .catch((error) => {
            console.log(error);
            dispatch(setNotification({ message: error.data, type: 'error', id: uuidv4() }));
          });
  };
  return (
    <ThemeProvider theme={theme}>
      <ComponentWrapper>
        <StyledForm onSubmit={handleSubmit(onSubmitHandler)}>
          <Logo src={lockImage} />
          <div>
            {isSignupMode ? (
              <FormInput
                name={'name'}
                label={'Name'}
                register={register}
                rules={{
                  required: 'You must enter your name',
                  minLength: { value: 4, message: 'Name length must be between 4 and 15' },
                  maxLength: { value: 15, message: 'Name length must be between 4 and 15' },
                  pattern: {
                    value: VALIDATION_LETTERS_ONLY,
                    message: 'Name must contain english letters only',
                  },
                }}
                errors={errors}
              />
            ) : null}
            <FormInput
              name={'email'}
              label={'Email'}
              register={register}
              rules={{
                required: 'You must enter your email',
                minLength: { value: 6, message: 'Email length must be greater than 6' },
                pattern: {
                  value: VALIDATION_EMAIL,
                  message: 'Please enter valid email',
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
              <Button label="login" type="submit" />
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
    </ThemeProvider>
  );
};

export default Authorization;
