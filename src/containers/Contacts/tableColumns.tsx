import { Cell } from 'react-table';

import CellDeleteButton from '../../components/Cells/CellDeleteButton';
import CellEditButton from '../../components/Cells/CellEditButton';
import { IPerson } from '../../types';

const getTableColumns = (deleteContact: (id: string) => Promise<void>) => {
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
          Cell: ({ row }: Cell<IPerson>) => CellEditButton(row.original.id),
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

export default getTableColumns;
