import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, generatePath } from 'react-router';
import { Cell } from 'react-table';
import { useDeleteContactMutation, useGetContactsQuery } from '../../components/api/apiSlice';

import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import Styles from '../../components/Table/style';
import { setCurrentContact } from '../../redux/slice';
import { IPerson } from '../../types';

const Contacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: contacts = [], isLoading } = useGetContactsQuery();

  const editContact = (id: number) => {
    console.log(typeof id);
    dispatch(setCurrentContact(id));
    navigate(
      generatePath('edit/:id', {
        id: id.toString(),
      })
    );
  };

  const [deleteContact] = useDeleteContactMutation();

  const columns = React.useMemo(
    () => [
      {
        Header: 'Contact list',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
          {
            Header: 'Phone',
            accessor: 'phone',
          },
          {
            Header: 'City',
            accessor: 'city',
          },
          {
            Header: 'Edit',
            accessor: 'edit',
            Cell: ({ row }: Cell<IPerson>) => (
              <div>
                <a onClick={() => editContact(row.original.id)}>Edit</a>
              </div>
            ),
          },
          {
            Header: 'Delete',
            accessor: 'delete',
            Cell: ({ row }: Cell<IPerson>) => (
              <div>
                <button onClick={() => deleteContact(row.original.id)}>Delete</button>
              </div>
            ),
          },
        ],
      },
    ],
    []
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Styles>
      <Table columns={columns} data={contacts} />
    </Styles>
  );
};

export default Contacts;
