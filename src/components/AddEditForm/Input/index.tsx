import { Fragment, InputHTMLAttributes } from 'react';
import { IPerson } from '../../../types';
import { StyledLabel, StyledInput, Error } from '../style';
import {
  UseFormRegister,
  RegisterOptions,
  DeepMap,
  FieldError,
  FieldValues,
} from 'react-hook-form';

type FieldErrors<TFieldValues extends FieldValues = FieldValues> = DeepMap<
  TFieldValues,
  FieldError
>;
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: nameOptions;
  label: string;
  rules: RegisterOptions;
  errors?: FieldErrors;
  register: UseFormRegister<IPerson>;
}

type nameOptions = 'id' | 'firstName' | 'lastName' | 'phone' | 'city';

const Input: React.FC<InputProps> = ({ name, label, rules, errors, register }) => {
  let errorMessages;

  // Найти ошибку, соответствующую имени инпута, если есть
  if (errors && errors[name]) {
    errorMessages = errors[name].message;
  }
  console.log(errors);
  return (
    <Fragment>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput {...register(name, rules)} />
      {<Error>{errorMessages}</Error>}
    </Fragment>
  );
};

export default Input;
