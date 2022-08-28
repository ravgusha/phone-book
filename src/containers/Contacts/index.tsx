import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { useDeleteContactMutation, useGetContactsQuery } from '../../redux/apiSlice';
import Table from '../../components/Table';
import getTableColumns from './tableColumns';
import ComponentWrapper from '../../components/ComponentWrapper';
import Link from '../../components/Link';
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

  const columns = getTableColumns(onDeleteHandle);

  return (
    <ComponentWrapper isLoading={isLoading}>
      {contacts.length > 0 ? (
        <Fragment>
          <Link to="/contacts/add" label="+ create contact" />
          <Table columns={columns} data={contacts} />
        </Fragment>
      ) : (
        <Fragment>
          <CoverTable />
          <Link to="/contacts/add" label="+ create contact" />
        </Fragment>
      )}
    </ComponentWrapper>
  );
};

export default Contacts;
