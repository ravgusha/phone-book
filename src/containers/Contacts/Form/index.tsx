import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import { IPerson } from '../../../types';
import FormInput from '../../../components/Form/FormInput';
import { setCurrentContact } from '../../../redux/slice';
import {
  useCreateContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from '../../../redux/apiSlice';

import { Logo, Submit, StyledForm, Container } from './style';

const VALIDATION_DIGITS_ONLY = new RegExp(/^\d+$/);

type IState = {
  slice: {
    currentContact: string | null;
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

  const isCreate = !currentContactId;

  const onSubmitHandler = (data: IPerson) => {
    const contact = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      city: data.city,
      id: isCreate ? uuidv4().slice(0, 8) : contactToEdit?.id,
    };

    isCreate
      ? createContact(contact)
          .unwrap()
          .then(() => {
            alert('Contact created!');
            navigate('/contacts');
          })
      : updateContact(contact)
          .unwrap()
          .then(() => {
            alert('Contact edited!');
            dispatch(setCurrentContact(null));
            navigate('/contacts');
          });
  };

  // Если режим редактирования, то запонить форму старыми значениями

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IPerson>();

  if (!isCreate && contactToEdit) {
    setValue('firstName', contactToEdit.firstName);
    setValue('lastName', contactToEdit.lastName);
    setValue('phone', contactToEdit.phone);
    setValue('city', contactToEdit.city);
  }

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit(onSubmitHandler)}>
        <Logo src="../../../contact.svg" />
        <FormInput
          name={'firstName'}
          label={'First name'}
          register={register}
          rules={{ required: 'You must enter your first name' }}
          errors={errors}
        />
        <FormInput
          name={'lastName'}
          label={'Last name'}
          register={register}
          rules={{ required: 'You must enter your last name' }}
          errors={errors}
        />
        <FormInput
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
          errors={errors}
        />
        <FormInput
          name={'city'}
          label={'City'}
          register={register}
          rules={{ required: 'You must enter your city' }}
          errors={errors}
        />
        {isCreate ? <Submit type="submit">Add</Submit> : <Submit type="submit">Edit</Submit>}
      </StyledForm>
    </Container>
  );
};

export default Form;
