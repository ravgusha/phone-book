import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Header from '../../components/Header';
import { IPerson } from '../../types';
import * as styles from '../../variables';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 450px;
  padding: 25px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  background-color: #fff;
`;

export const Container = styled.div`
  height: 94vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Submit = styled.button`
  background-color: ${styles.SECONDARY_COLOR};
  text-transform: uppercase;
  outline: 0;
  border: 0;
  padding: 10px;
  color: #ffffff;
  font-size: 14px;
  margin-top: 15px;
  cursor: pointer;
`;

export const Logo = styled.img`
  width: 55px;
  height: 55px;
  align-self: center;
  color: #639cd9;
  margin-bottom: 21px;
`;

export const Input = styled.input`
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`;

export const Error = styled.p`
  color: red;
`;

const VALIDATION_DIGITS_ONLY = new RegExp(/^\d+$/);

const AddPage = () => {
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
    <>
      <Header />
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
        </Form>
      </Container>
    </>
  );
};

export default AddPage;
