import { v4 as uuidv4 } from 'uuid';

import { useDeleteContactMutation, useGetContactsQuery } from '../../redux/apiSlice';
import Table from '../../components/Table';
import tableColumns from './tableColumns';
import ComponentWrapper from '../../components/ComponentWrapper';
import Link from '../../components/Link';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../redux/slice';
import CoverTable from '../../components/CoverTable';

const Contacts = () => {
  const dispatch = useDispatch();
  const { data: contacts = [], isLoading } = useGetContactsQuery();

  const [deleteContact] = useDeleteContactMutation();

  const onDeleteHandle = (id: number) =>
    deleteContact(id)
      .unwrap()
      .then(() => {
        dispatch(setNotification({ message: 'Contact deleted!', type: 'warning', id: uuidv4() }));
      })
      .catch((error) => {
        dispatch(setNotification({ message: error.error, type: 'error', id: uuidv4() }));
      });

  const columns = tableColumns(onDeleteHandle);

  return (
    <ComponentWrapper isLoading={isLoading}>
      {contacts.length > 0 ? <Table columns={columns} data={contacts} /> : <CoverTable />}
      <Link to="/contacts/add" label="+ create contact" />
    </ComponentWrapper>
  );
};

export default Contacts;
