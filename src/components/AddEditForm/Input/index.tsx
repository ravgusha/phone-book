import { Fragment, InputHTMLAttributes } from 'react';
import { IPerson } from '../../../types';
import { StyledLabel, StyledInput, Error } from '../style';
import { UseFormRegister, RegisterOptions, DeepMap, FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: nameOptions;
  label: string;
  rules: RegisterOptions;
  errors?: Partial<DeepMap<InputHTMLAttributes<HTMLInputElement>, FieldError>>;
  register: UseFormRegister<IPerson>; // declare register props
}

type nameOptions = 'id' | 'firstName' | 'lastName' | 'phone' | 'city';

const Input: React.FC<InputProps> = ({ name, label, rules, errors, register }) => {
  return (
    <Fragment>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput {...register(name, rules)} />
      {/* Здесь будет ошибка */}
    </Fragment>
  );
};

export default Input;
