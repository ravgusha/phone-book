import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';

import { IPerson } from '../../../types';
import FormInput from '../../../components/Form/FormInput';
import ComponentWrapper from '../../../components/ComponentWrapper';
import {
  useCreateContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from '../../../redux/apiSlice';
import { Logo, StyledForm } from './style';
import { setNotification } from '../../../redux/slice';
import Button from '../../../components/Button';
import { VALIDATION_DIGITS_ONLY } from '../contants';
import logoImage from '../../../assets/contact.svg';

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: contacts = [], isLoading } = useGetContactsQuery();
  const [createContact] = useCreateContactMutation();
  const [updateContact] = useUpdateContactMutation();

  const contactToEdit = contacts.find((contact: IPerson) => {
    return contact.id === id;
  });

  // Если в стейте есть ID, то выбран режим редактирования
  const isCreate = !id;
  const dispatch = useDispatch();

  const onSubmitHandler = (data: FieldValues) => {
    const contact = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      city: data.city,
      id: isCreate ? uuidv4().slice(0, 8) : contactToEdit?.id,
    };

    // Если нет изменений, вернуть
    if (JSON.stringify(contactToEdit) === JSON.stringify(contact)) {
      return;
    }

    isCreate
      ? createContact(contact)
          .unwrap()
          .then(() => {
            dispatch(
              setNotification({ message: 'Contact created', type: 'success', id: uuidv4() })
            );
            navigate('/contacts');
          })
          .catch((error) => {
            dispatch(setNotification({ message: error.error, type: 'error', id: uuidv4() }));
          })
      : updateContact(contact)
          .unwrap()
          .then(() => {
            dispatch(setNotification({ message: 'Contact edited', type: 'success', id: uuidv4() }));
            navigate('/contacts');
          })
          .catch((error) => {
            dispatch(setNotification({ message: error.error, type: 'error', id: uuidv4() }));
          });
  };

  // Если режим редактирования, то запонить форму старыми значениями
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FieldValues>();

  if (!isCreate && contactToEdit) {
    setValue('firstName', contactToEdit.firstName);
    setValue('lastName', contactToEdit.lastName);
    setValue('phone', contactToEdit.phone);
    setValue('city', contactToEdit.city);
  }

  return (
    <ComponentWrapper isLoading={isLoading}>
      <StyledForm onSubmit={handleSubmit(onSubmitHandler)}>
        <Logo src={logoImage} />
        <div>
          <FormInput
            name={'firstName'}
            label={'First name'}
            register={register}
            rules={{ required: 'You must enter your first name' }}
            errors={errors}
          />
          <FormInput
            name={'lastName'}
            label={'Last name'}
            register={register}
            rules={{ required: 'You must enter your last name' }}
            errors={errors}
          />
          <FormInput
            name={'phone'}
            label={'Phone'}
            register={register}
            rules={{
              required: 'You must enter your phone',
              minLength: { value: 6, message: 'Phone length must be between 6 and 11' },
              maxLength: { value: 11, message: 'Phone length must be between 6 and 11' },
              pattern: {
                value: VALIDATION_DIGITS_ONLY,
                message: 'Phone number must contain digits only',
              },
            }}
            errors={errors}
          />
          <FormInput
            name={'city'}
            label={'City'}
            register={register}
            rules={{ required: 'You must enter your city' }}
            errors={errors}
          />
        </div>
        {isCreate ? <Button label="add" type="submit" /> : <Button label="edit" type="submit" />}
      </StyledForm>
    </ComponentWrapper>
  );
};

export default Form;
