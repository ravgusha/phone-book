import { useDeleteContactMutation, useGetContactsQuery } from '../../redux/apiSlice';
import Table from '../../components/Table';
import tableColumns from './tableColumns';
import ComponentWrapper from '../../components/ComponentWrapper';
import Link from '../../components/Link';
import { toast } from 'react-toastify';

const Contacts = () => {
  const { data: contacts = [], isLoading } = useGetContactsQuery();

  const [deleteContact] = useDeleteContactMutation();

  const onDeleteHandle = (id: number) =>
    deleteContact(id)
      .unwrap()
      .then(() => {
        toast.success('Contact deleted!');
      })
      .catch((error) => toast.error(error.error));

  const columns = tableColumns(onDeleteHandle);

  return (
    <ComponentWrapper isLoading={isLoading}>
      <Table columns={columns} data={contacts} />
      <Link to="/contacts/add" label="+ create contact" />
    </ComponentWrapper>
  );
};

export default Contacts;
