import { Cell } from 'react-table';

import Button from '../../components/Button';
import { IPerson } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tableColumns = (editContact: any, deleteContact:any) => {
  return [
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
          // Не работает
          // Cell: ({ row }: Cell<IPerson>) => CellEditButton(row, editContact(row.original.id)),
        },
        {
          Header: 'Delete',
          accessor: 'delete',
          Cell: ({ row }: Cell<IPerson>) => (
            <Button onClick={() => deleteContact(row.original.id)} label="Delete"></Button>
          ),
          // Не работает
          // Cell: ({ row }: Cell<IPerson>) => CellDeleteButton(row, deleteContact(row.original.id)),
        },
      ],
    },
  ];
};

export default tableColumns;
