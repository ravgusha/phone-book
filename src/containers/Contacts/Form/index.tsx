// import { ErrorMessage } from '@hookform/error-message';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { setCurrentContact } from '../../../redux/slice';

import { IPerson } from '../../../types';
import { VALIDATION_DIGITS_ONLY } from '../../../variables';
import {
  useCreateContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from '../../../redux/apiSlice';
import FormError from '../../../components/Form/FormError';
import Input from '../../../components/Form/FormInput';
import { Logo, Submit, StyledForm, Container } from './style';

type IState = {
  slice: {
    currentContact: number | null;
  };
};

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: contacts = [] } = useGetContactsQuery();

  const [createContact] = useCreateContactMutation();
  const [updateContact] = useUpdateContactMutation();

  const currentContactId = useSelector((state: IState) => state.slice.currentContact);

  const contactToEdit = contacts.find((contact) => {
    return contact.id === currentContactId;
  });
  // Если в стейте есть ID, то выбран редим редактирования
  const isAddMode = !currentContactId;

  const AddContact = (data: IPerson) => {
    const newContact = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      city: data.city,
      id: uuidv4().slice(0, 8),
    };

    createContact(newContact)
      .unwrap()
      .then(() => {
        alert('Contact created!');
        navigate('/contacts');
      });
  };

  const EditContact = (data: IPerson) => {
    const updatedContact = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      city: data.city,
      id: contactToEdit?.id,
    };

    updateContact(updatedContact)
      .unwrap()
      .then(() => {
        alert('Contact edited!');
        dispatch(setCurrentContact(null));
        navigate('/');
      });
  };

  // Если режим редактирования, то запонить форму старыми значениями

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IPerson>();

  if (!isAddMode && contactToEdit) {
    setValue('firstName', contactToEdit.firstName);
    setValue('lastName', contactToEdit.lastName);
    setValue('phone', contactToEdit.phone);
    setValue('city', contactToEdit.city);
  }

  const onSubmit: SubmitHandler<IPerson> = (data) => {
    return isAddMode ? AddContact(data) : EditContact(data);
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Logo src="../../../contact.svg" />
        <Input
          name={'firstName'}
          label={'First name'}
          register={register}
          rules={{ required: 'You must enter your first name' }}
        />
        <FormError errors={errors} name={'firstName'} />
        <Input
          name={'lastName'}
          label={'Last name'}
          register={register}
          rules={{ required: 'You must enter your last name' }}
        />
        <FormError errors={errors} name={'lastName'} />
        <Input
          name={'phone'}
          label={'Phone'}
          register={register}
          rules={{
            required: 'You must enter your phone',
            minLength: { value: 6, message: 'Phone length must be between 6 and 11' },
            maxLength: { value: 11, message: 'Phone length must be between 6 and 11' },
            pattern: {
              value: VALIDATION_DIGITS_ONLY,
              message: 'Phone number must contain digits only',
            },
          }}
        />
        <FormError errors={errors} name={'phone'} />
        <Input
          name={'city'}
          label={'City'}
          register={register}
          rules={{ required: 'You must enter your city' }}
        />
        <FormError errors={errors} name={'city'} />
        {isAddMode ? <Submit type="submit">Add</Submit> : <Submit type="submit">Edit</Submit>}
      </StyledForm>
    </Container>
  );
};

export default Form;
