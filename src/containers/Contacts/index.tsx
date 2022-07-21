import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, generatePath } from 'react-router';
import { Cell } from 'react-table';

import Table from '../../components/Table';
import Styles from '../../components/Table/style';
import { setContacts, setCurrentContact } from '../../redux/slice';
import { IState } from '../../redux/types';
import { IPerson } from '../../types';

const Contacts = () => {
  const contacts = useSelector((state: IState) => state.contacts);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    getContacts();
  }, []);

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

  const deleteContact = (id: number) => {
    console.log(id);
    fetch(`http://localhost:4000/contacts/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        alert('Contact deleted!');
        getContacts();
      }
    });
  };

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

  return (
      <Styles>
        <Table columns={columns} data={contacts} />
      </Styles>
  );
};

export default Contacts;
