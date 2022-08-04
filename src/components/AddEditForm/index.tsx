import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { setCurrentContact } from '../../redux/slice';

import { IPerson } from '../../types';
import { VALIDATION_DIGITS_ONLY } from '../../variables';
import { useCreateContactMutation, useGetContactsQuery } from '../api/apiSlice';
import Input from './Input';
import { Logo, Submit, StyledForm, Container } from './style';

type IState = {
  slice: {
    currentContact: number | null;
  };
};

const AddEditForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: contacts = [] } = useGetContactsQuery();
  const [createContact, isSuccess] = useCreateContactMutation();
  // console.log(contacts);
  const state = useSelector((state: IState) => state);
  const currentContactId = useSelector((state: IState) => state.slice.currentContact);
  console.log(state, currentContactId);

  const contactToEdit = contacts.find((contact) => {
    // console.log(typeof contact.id, typeof currentContactId, currentContactId);
    return contact.id === currentContactId;
  });
  console.log(contactToEdit);
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
    createContact(newContact).unwrap();

    if (isSuccess) {
      alert('Contact created!');
      navigate('/');
    }
  };

  const EditContact = (data: IPerson) => {
    fetch(`http://localhost:4000/contacts/${currentContactId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        city: data.city,
        id: contactToEdit?.id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        alert('Contact edited!');
        dispatch(setCurrentContact(null));
        navigate('/');
      }
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
        <Logo src="../../../contact.svg"></Logo>
        <Input
          name={'firstName'}
          label={'First name'}
          register={register}
          rules={{ required: 'You must enter your first name' }}
          errors={errors}
        ></Input>
        <Input
          name={'lastName'}
          label={'Last name'}
          register={register}
          rules={{ required: 'You must enter your last name' }}
          errors={errors}
        ></Input>
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
          errors={errors}
        ></Input>
        <Input
          name={'city'}
          label={'City'}
          register={register}
          rules={{ required: 'You must enter your city' }}
          errors={errors}
        ></Input>
        {isAddMode ? <Submit type="submit">Add</Submit> : <Submit type="submit">Edit</Submit>}
      </StyledForm>
    </Container>
  );
};

export default AddEditForm;
