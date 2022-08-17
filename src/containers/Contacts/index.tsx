import { useNavigate } from 'react-router';

import { useDeleteContactMutation, useGetContactsQuery } from '../../redux/apiSlice';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import tableColumns from './tableColumns';
import ComponentWrapper from '../../components/ComponentWrapper';

const Contacts = () => {
  const navigate = useNavigate();

  const { data: contacts = [], isLoading } = useGetContactsQuery();

  const [deleteContact] = useDeleteContactMutation();

  const columns = tableColumns(deleteContact);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ComponentWrapper>
      <Table columns={columns} data={contacts} />
      <Button
        onClick={() => {
          navigate('/contacts/add');
        }}
        label="+ create contact"
      />
    </ComponentWrapper>
  );
};

export default Contacts;
