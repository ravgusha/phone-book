/* eslint-disable react/jsx-key */
import React from 'react';
import styled from 'styled-components';
import { useTable, UseTableRowProps } from 'react-table';

import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../redux/types';
import { useNavigate, generatePath } from 'react-router';
import { setCurrentContact, setContacts } from '../redux/slice';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;



function Table({ columns, data }) {

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function App() {
  const contacts = useSelector((state: IState) => state.contacts);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  
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
    fetch(`http://localhost:4000/contacts/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        alert('Contact deleted!');
        const filteredBooks = contacts.filter((contact) => contact.id !== id);
        dispatch(setContacts([...filteredBooks]));
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
            Cell: ({row}) => (
              <div>
                 <a onClick={() => editContact(row.original.id)}>Edit</a>
              </div>
            )
          },
          {
            Header: 'Delete',
            accessor: 'delete',
            Cell: ({row}) => (
              <div>
                 <button onClick={() => deleteContact(row.original.id)}>Delete</button>
              </div>
            )
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
}

export default App;
