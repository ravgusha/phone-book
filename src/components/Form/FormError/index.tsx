import { ErrorMessage } from '@hookform/error-message';
import { DeepRequired, FieldErrorsImpl } from 'react-hook-form';

import { IPerson } from '../../../types';
import { nameOptions } from '../FormInput';
import { StyledError } from './style';

interface IFormError {
  errors: FieldErrorsImpl<DeepRequired<IPerson>>;
  name: nameOptions;
}

const FormError = ({ name, errors }: IFormError) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <StyledError>{message}</StyledError>}
    />
  );
};

export default FormError;
