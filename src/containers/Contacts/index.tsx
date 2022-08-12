import { useDispatch } from 'react-redux';
import { useNavigate, generatePath } from 'react-router';

import { useDeleteContactMutation, useGetContactsQuery } from '../../redux/apiSlice';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import Container from '../../components/Table/style';
import { setCurrentContact } from '../../redux/slice';
import tableColumns from './tableColumns';

const Contacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: contacts = [], isLoading } = useGetContactsQuery();

  const editContact = (id: number) => {
    dispatch(setCurrentContact(id));
    navigate(
      generatePath('form/:id', {
        id: id.toString(),
      })
    );
  };

  const [deleteContact] = useDeleteContactMutation();

  const columns = tableColumns(editContact, deleteContact);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Table columns={columns} data={contacts} />
      <Button
        onClick={() => {
          navigate('/contacts/add');
        }}
        label="+ create contact"
      ></Button>
    </Container>
  );
};

export default Contacts;
