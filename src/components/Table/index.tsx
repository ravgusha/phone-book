/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import { useTable, Column, useGlobalFilter } from 'react-table';

import { IPerson } from '../../types';
import Filter from './FilterTable';
import StyledTable from './style';

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
      <Filter filter={globalFilter} setFilter={setGlobalFilter} />
      <StyledTable {...getTableProps()}>
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
      </StyledTable>
    </Fragment>
  );
};

export default Table;
