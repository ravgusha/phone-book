import { ErrorMessage } from '@hookform/error-message';

const FormError = ({name, errors}) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <p>{message}</p>}
    ></ErrorMessage>
  );
};

export default FormError;
