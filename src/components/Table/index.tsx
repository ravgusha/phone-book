import React, { Fragment } from 'react';
import { useTable, Column, useGlobalFilter } from 'react-table';

import { IPerson } from '../../types';
import TableFilter from './TableFilter';
import StyledTable from './style';
import TableHead from './TableHead';
import TableBody from './TableBody';

interface Props {
  columns: Array<Column<object>>;
  data: Array<IPerson>;
}

const Table: React.FC<Props> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <Fragment>
      <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <StyledTable {...getTableProps()}>
        <TableHead headerGroups={headerGroups} />
        <TableBody getTableBodyProps={getTableBodyProps} rows={rows} prepareRow={prepareRow} />
      </StyledTable>
    </Fragment>
  );
};

export default Table;
