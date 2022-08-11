import { Row } from 'react-table';
import { IPerson } from '../../types';

import Button from '../Button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CellDeleteButton = (row: Row<IPerson>, onClick: any) => {
  return <Button onClick={() => onClick(row.original.id)} label="Delete"></Button>;
};

export default CellDeleteButton;
