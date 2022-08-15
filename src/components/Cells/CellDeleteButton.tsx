import { Row } from 'react-table';
import { IPerson } from '../../types';

import Button from '../Button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CellDeleteButton = (row: Row<IPerson>, onClick: any) => {
  const onDeleteHandle = () => onClick(row.original.id);

  return <Button onClick={onDeleteHandle} label="Delete"></Button>;
};

export default CellDeleteButton;
