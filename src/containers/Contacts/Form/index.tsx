import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IPerson } from '../../../types';
import FormInput from '../../../components/Form/FormInput';
import ComponentWrapper from '../../../components/ComponentWrapper';
import {
  useCreateContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from '../../../redux/apiSlice';
import logoImage from '../../../assets/contact.svg';

import { Logo, Submit, StyledForm } from './style';
import { setNotification } from '../../../redux/slice';
import { useDispatch } from 'react-redux';

const VALIDATION_DIGITS_ONLY = new RegExp(/^\d+$/);

const Form = () => {
  const navigate = useNavigate();

  const { data: contacts = [], isLoading } = useGetContactsQuery();

  const [createContact] = useCreateContactMutation();
  const [updateContact] = useUpdateContactMutation();

  const { id } = useParams();

  const contactToEdit = contacts.find((contact) => {
    return contact.id === id;
  });

  // Если в стейте есть ID, то выбран редим редактирования

  const isCreate = !id;
  const dispatch = useDispatch();

  const onSubmitHandler = (data: IPerson) => {
    const contact = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      city: data.city,
      id: isCreate ? uuidv4().slice(0, 8) : contactToEdit?.id,
    };

    isCreate
      ? createContact(contact)
          .unwrap()
          .then(() => {
            toast.success('Contact created!');
            navigate('/contacts');
          })
          .catch((error) => toast.error(error.error))
      : updateContact(contact)
          .unwrap()
          .then(() => {
            dispatch(setNotification({ message: 'edited! 😩', type: 'success' }));
            navigate('/contacts');
          })
          .catch((error) => toast.error(error.error));
  };

  // Если режим редактирования, то запонить форму старыми значениями

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IPerson>();

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
        {isCreate ? <Submit type="submit">Add</Submit> : <Submit type="submit">Edit</Submit>}
      </StyledForm>
    </ComponentWrapper>
  );
};

export default Form;
