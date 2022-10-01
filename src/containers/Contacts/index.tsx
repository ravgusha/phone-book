import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider } from 'styled-components';

import { useDeleteContactMutation, useGetContactsQuery } from '../../redux/apiSlice';
import Table from '../../components/Table';
import getTableColumns from './tableColumns';
import ComponentWrapper from '../../components/ComponentWrapper';
import Link from '../../components/Link';
import { setNotification } from '../../redux/notificationSlice';
import CoverTable from '../../components/Table/TableCover';
import { Navigate } from 'react-router-dom';
import { IState } from '../Notification';

const theme = {
  h: '100%',
  jc: 'start',
  mg: '86px auto',
  as: 'end',
};

const Contacts = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: IState) => state.userSlice.isLoggedIn);
  const { data: contacts = [], isLoading } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const onDeleteHandle = (id: string) =>
    deleteContact(id)
      .unwrap()
      .then(() => {
        dispatch(setNotification({ message: 'Contact deleted!', type: 'warning', id: uuidv4() }));
      })
      .catch((error) => {
        dispatch(setNotification({ message: error.data, type: 'error', id: uuidv4() }));
      });

  const columns = getTableColumns(onDeleteHandle);

  return isLoggedIn ? (
    contacts.length > 0 ? (
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
    )
  ) : (
    <Navigate to="/login" replace />
  );
};

export default Contacts;
