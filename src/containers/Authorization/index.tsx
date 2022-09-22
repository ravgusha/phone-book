import { FieldValues, useForm } from 'react-hook-form';

import Button from '../../components/Button';
import ComponentWrapper from '../../components/ComponentWrapper';
import FormInput from '../../components/Form/FormInput';
import { StyledForm, Logo, StyledLink } from './style';
import lockImage from '../../assets/lock.svg';
import { useGetContactsQuery } from '../../redux/apiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { VALIDATION_DIGITS_AND_LETTERS_ONLY } from './constants';

const Authorization = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Определяем, в каком режиме находимся авторизации или регистрации
  let isSignupMode = false;
  if (location.pathname === '/signup') {
    isSignupMode = true;
  }
  console.log(isSignupMode);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>();

  const { data: contacts = [], isLoading } = useGetContactsQuery();

  const onSubmitHandler = (data: FieldValues) => {
    console.log(data);
    // const contact = {
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   phone: data.phone,
    //   city: data.city,
    //   id: isCreate ? uuidv4().slice(0, 8) : contactToEdit?.id,
    // };
    // // Если нет изменений, вернуть
    // if (JSON.stringify(contactToEdit) === JSON.stringify(contact)) {
    //   return;
    // }
  };
  return (
    <ComponentWrapper isLoading={isLoading}>
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
                message: 'Username must contain digits ans letters only',
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
