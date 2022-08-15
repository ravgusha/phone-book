import { Cell } from 'react-table';

import CellDeleteButton from '../../components/Cells/CellDeleteButton';
import CellEditButton from '../../components/Cells/CellEditButton';
import { IPerson } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tableColumns = (editContact: any, deleteContact: any) => {
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
          Cell: ({ row }: Cell<IPerson>) => CellEditButton(row, editContact),
        },
        {
          Header: 'Delete',
          accessor: 'delete',
          Cell: ({ row }: Cell<IPerson>) => CellDeleteButton(row, deleteContact),
        },
      ],
    },
  ];
};

export default tableColumns;
