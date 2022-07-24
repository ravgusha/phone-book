import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { setCurrentContact } from '../../redux/slice';
import { IState } from '../../redux/types';

import { IPerson } from '../../types';
import { VALIDATION_DIGITS_ONLY } from '../../variables';
import { Logo, Input, Submit, StyledForm, Error, Container } from './style';

const AddEditForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contacts = useSelector((state: IState) => state.contacts);
  const currentContactId = useSelector((state: IState) => state.currentContact);
  const contactToEdit = contacts.find((contact) => contact.id === currentContactId);

  // Если в стейте есть ID, то выбран редим редактирования
  const isAddMode = !currentContactId;

  const AddContact = (data: IPerson) => {
    fetch('http://localhost:4000/contacts', {
      method: 'POST',
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        city: data.city,
        id: uuidv4().slice(0, 8),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((res) => {
      if (res.status > 200 && res.status < 300) {
        alert('Contact created!');
        navigate('/');
      }
    });
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

  useEffect(() => {
    // Если режим редактирования, то запонить форму старыми значениями
    if (!isAddMode && contactToEdit) {
      setValue('firstName', contactToEdit.firstName);
      setValue('lastName', contactToEdit.lastName);
      setValue('phone', contactToEdit.phone);
      setValue('city', contactToEdit.city);
    }
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IPerson>();

  const onSubmit: SubmitHandler<IPerson> = (data) => {
    return isAddMode ? AddContact(data) : EditContact(data);
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Logo src="../../../contact.svg"></Logo>
        <Input placeholder="First name" {...register('firstName', { required: true })} />
        {errors.firstName?.type === 'required' && <Error>First name is required</Error>}
        <Input placeholder="Last name" {...register('lastName', { required: true })} />
        {errors.lastName?.type === 'required' && <Error>Last name is required</Error>}
        <Input
          placeholder="Telephone"
          type="tel"
          {...register('phone', {
            required: true,
            minLength: 6,
            maxLength: 11,
            pattern: VALIDATION_DIGITS_ONLY,
          })}
        />
        {errors.phone?.type === 'required' && <Error>Phone is required</Error>}
        {errors.phone?.type === 'pattern' && <Error>Phone number must be digits only</Error>}
        {errors.phone?.type === 'minLength' && <Error>Length must be between 6 and 11</Error>}
        {errors.phone?.type === 'maxLength' && <Error>Length must be between 6 and 11</Error>}
        <Input placeholder="City" {...register('city', { required: true })} />
        {errors.city?.type === 'required' && <Error>City is required</Error>}
        {isAddMode ? <Submit type="submit">Add</Submit> : <Submit type="submit">Edit</Submit>}
      </StyledForm>
    </Container>
  );
};

export default AddEditForm;
