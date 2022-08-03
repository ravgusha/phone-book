import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, generatePath } from 'react-router';
import { Cell } from 'react-table';
import { useDeleteContactMutation, useGetContactsQuery } from '../../components/api/apiSlice';

import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import Styles from '../../components/Table/style';
import { IState, setContacts, setCurrentContact } from '../../redux/slice';
import { IPerson } from '../../types';

const Contacts = () => {
  // const contacts = useSelector((state: IState) => state.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   getContacts();
  // }, []);

  const { data: contacts = [], isLoading } = useGetContactsQuery();

  const getContacts = () => {
    fetch('http://localhost:4000/contacts')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setContacts(data));
      });
  };

  const editContact = (id: number) => {
    console.log(id);
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
