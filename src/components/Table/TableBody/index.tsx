import { Row, TableBodyPropGetter, TableBodyProps } from 'react-table';

interface ITableBody {
  getTableBodyProps: (propGetter?: TableBodyPropGetter<object> | undefined) => TableBodyProps;
  rows: Row<object>[];
  prepareRow: (row: Row<object>) => void;
}

const TableBody = ({ getTableBodyProps, rows, prepareRow }: ITableBody) => {
  return (
    <tbody {...getTableBodyProps}>
      {rows.map((row) => {
        prepareRow(row);
        const { key, ...restRowProps } = row.getRowProps();
        return (
          <tr key={key} {...restRowProps}>
            {row.cells.map((cell) => {
              const { key, ...restCellProps } = cell.getCellProps();
              return (
                <td key={key} {...restCellProps}>
                  {cell.render('Cell')}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
