import { Fragment, InputHTMLAttributes } from 'react';
import { IPerson } from '../../types';
import { StyledLabel, StyledInput} from './style';
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

const Input: React.FC<InputProps> = ({ name, label, rules,  register }) => {
  return (
    <Fragment>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput {...register(name, rules)} />
    </Fragment>
  );
};

export default Input;
