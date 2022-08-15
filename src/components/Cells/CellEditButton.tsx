import { Row } from 'react-table';

import { IPerson } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CellEditButton = (row: Row<IPerson>, onClick?: any) => {
  const onEditHandle = () => onClick(row.original.id);

  return <a onClick={onEditHandle}>Edit</a>;
};

export default CellEditButton;
