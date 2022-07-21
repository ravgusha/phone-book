import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from 'uuid';

import { IPerson } from "../../../types";
import { VALIDATION_DIGITS_ONLY } from "../../../variables";
import { Logo, Input, Submit, StyledForm, Error } from "../../style";

const AddForm = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IPerson>();

  const onSubmit: SubmitHandler<IPerson> = (data) => {
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

  return (
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
      <Submit type="submit"> Add</Submit>
    </StyledForm>
  );
};

export default AddForm;
