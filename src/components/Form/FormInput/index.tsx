import { Fragment, InputHTMLAttributes } from 'react';
import {
  UseFormRegister,
  RegisterOptions,
  DeepMap,
  FieldError,
  FieldValues,
} from 'react-hook-form';
import { StyledLabel, StyledInput } from './style';
import FormError from '../FormError';

type FieldErrors<TFieldValues extends FieldValues = FieldValues> = DeepMap<
  TFieldValues,
  FieldError
>;
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string;
  rules: RegisterOptions;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

const FormInput: React.FC<InputProps> = ({ name, label, rules, errors, register }) => {
  return (
    <Fragment>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput {...register(name, rules)} />
      <FormError errors={errors} name={name} />
    </Fragment>
  );
};

export default FormInput;
