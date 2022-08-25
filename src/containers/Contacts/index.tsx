import { useDeleteContactMutation, useGetContactsQuery } from '../../redux/apiSlice';
import Table from '../../components/Table';
import tableColumns from './tableColumns';
import ComponentWrapper from '../../components/ComponentWrapper';
import Link from '../../components/Link';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../redux/slice';
import Notification from '../Notification';

const Contacts = () => {
  const dispatch = useDispatch();
  const { data: contacts = [], isLoading } = useGetContactsQuery();

  const [deleteContact] = useDeleteContactMutation();

  const onDeleteHandle = (id: number) =>
    deleteContact(id)
      .unwrap()
      .then(() => {
        dispatch(setNotification({ message: 'Something went wrong! 😩', type: 'success' }));
      })
      .catch((error) => toast.error(error.error));

  const columns = tableColumns(onDeleteHandle);

  return (
    <ComponentWrapper isLoading={isLoading}>
      <Notification/>
      {contacts.length > 0 ? (
        <Table columns={columns} data={contacts} />
      ) : (
        <>
          <img style={{ paddingLeft: '14px' }} src="../../../empty.png" />
          <div style={{ padding: '20px 0' }}>
            <h2>No contacts to display</h2>
            <p>Would you like to add one now?</p>
          </div>
        </>
      )}
      <Link to="/contacts/add" label="+ create contact" />
    </ComponentWrapper>
  );
};

export default Contacts;
