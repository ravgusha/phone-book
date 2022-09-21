import { FieldValues, useForm } from 'react-hook-form';

import Button from '../../components/Button';
import ComponentWrapper from '../../components/ComponentWrapper';
import FormInput from '../../components/Form/FormInput';
import { StyledForm, Logo, StyledLink } from './style';
import lockImage from '../../assets/lock.svg';
import { useGetContactsQuery } from '../../redux/apiSlice';
import { useLocation, useNavigate } from 'react-router-dom';

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
          {isSignupMode ? (
            <FormInput
              name={'name'}
              label={'Name'}
              register={register}
              rules={{ required: 'You must enter your name' }}
              errors={errors}
            />
          ) : null}
          <FormInput
            name={'login'}
            label={'Login'}
            register={register}
            rules={{ required: 'You must enter your login' }}
            errors={errors}
          />
          <FormInput
            name={'password'}
            label={'Password'}
            register={register}
            rules={{ required: 'You must enter your password' }}
            errors={errors}
          />
        </div>
        {isSignupMode ? (
          <Button label="sign up" type="submit" />
        ) : (
          <Button label="sign in" type="submit" />
        )}
        <StyledLink
          onClick={() => {
            navigate('/signup');
          }}
        >
          Don&apos;t have an account? Sign up
        </StyledLink>
      </StyledForm>
    </ComponentWrapper>
  );
};

export default Authorization;
