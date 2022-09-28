import { ErrorMessage } from '@hookform/error-message';
import { DeepRequired, FieldErrorsImpl, FieldValues } from 'react-hook-form';

import { StyledError } from './style';

interface IFormError {
  errors: FieldErrorsImpl<DeepRequired<FieldValues>>;
  name: string;
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
