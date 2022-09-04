import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider } from 'styled-components';

import { useDeleteContactMutation, useGetContactsQuery } from '../../redux/apiSlice';
import Table from '../../components/Table';
import getTableColumns from './tableColumns';
import ComponentWrapper from '../../components/ComponentWrapper';
import Link from '../../components/Link';
import { setNotification } from '../../redux/slice';
import CoverTable from '../../components/Table/CoverTable';

const theme = {
  jc: 'start',
  mg: '86px auto',
  as: 'end',
};

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

  const columns = getTableColumns(onDeleteHandle);

  return contacts.length > 0 ? (
    <ThemeProvider theme={theme}>
      <ComponentWrapper isLoading={isLoading}>
        <Link to="/contacts/add" label="+ create contact" />
        <Table columns={columns} data={contacts} />
      </ComponentWrapper>
    </ThemeProvider>
  ) : (
    <ComponentWrapper isLoading={isLoading}>
      <CoverTable />
      <Link to="/contacts/add" label="+ create contact" />
    </ComponentWrapper>
  );
};

export default Contacts;
