import { useDeleteContactMutation, useGetContactsQuery } from '../../redux/apiSlice';
import Table from '../../components/Table';
import tableColumns from './tableColumns';
import ComponentWrapper from '../../components/ComponentWrapper';
import Link from '../../components/Link';



const Contacts = () => {

  const { data: contacts = [], isLoading } = useGetContactsQuery();

  const [deleteContact] = useDeleteContactMutation();

  const columns = tableColumns(deleteContact);

  return (
    <ComponentWrapper isLoading={isLoading}>
      <Table columns={columns} data={contacts} />
      <Link to="/contacts/add" label="+ create contact" />
    </ComponentWrapper>
  );
};

export default Contacts;
