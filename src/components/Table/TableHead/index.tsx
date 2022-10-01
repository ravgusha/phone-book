import { HeaderGroup } from 'react-table';

interface ITableHead {
  headerGroups: HeaderGroup<object>[];
}

const TableHead = ({ headerGroups }: ITableHead) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => {
        const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
        return (
          <tr key={key} {...restHeaderGroupProps}>
            {headerGroup.headers.map((column) => {
              const { key, ...restHeaderProps } = column.getHeaderProps();
              return (
                <th key={key} {...restHeaderProps}>
                  {column.render('Header')}
                </th>
              );
            })}
          </tr>
        );
      })}
    </thead>
  );
};

export default TableHead;
