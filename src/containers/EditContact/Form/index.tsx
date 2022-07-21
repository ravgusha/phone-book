import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { IState } from '../../../redux/types';
import { IPerson } from '../../../types';
import { Container, Logo, Input, Submit, StyledForm, Error } from '../../style';

const EditForm = () => {
  const navigate = useNavigate();
  const currentContact = useSelector((state: IState) => state.currentContact);
  const contacts = useSelector((state: IState) => state.contacts);

  console.log(currentContact);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IPerson>();

  const contactToEdit = contacts.find((contact) => contact.id === currentContact);
  console.log(contactToEdit);

  const setValues = () => {
    if (contactToEdit) {
      setValue('firstName', contactToEdit.firstName);
      setValue('lastName', contactToEdit.lastName);
      setValue('phone', contactToEdit.phone);
      setValue('city', contactToEdit.city);
    }
  };

  setValues();

  const onSubmit: SubmitHandler<IPerson> = (data) => {
    fetch(`http://localhost:4000/contacts/${currentContact}`, {
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
        navigate('/');
      }
    });
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Logo src="../../../contact.svg"></Logo>
        <Input {...register('firstName', { required: true })} />
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
            pattern: /^\d+$/,
          })}
        />
        {errors.phone?.type === 'required' && <Error>Phone is required</Error>}
        {errors.phone?.type === 'pattern' && <Error>Phone number must be numbers only</Error>}
        {errors.phone?.type === 'minLength' && <Error>Length must be between 6 and 11</Error>}
        {errors.phone?.type === 'maxLength' && <Error>Length must be between 6 and 11</Error>}
        <Input placeholder="City" {...register('city', { required: true })} />
        {errors.city?.type === 'required' && <Error>City is required</Error>}
        <Submit type="submit">Edit</Submit>
      </StyledForm>
    </Container>
  );
};

export default EditForm;
