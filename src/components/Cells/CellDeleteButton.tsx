import { Row } from 'react-table';
import { IPerson } from '../../types';

import Button from '../Button';

const CellDeleteButton = (row: Row<IPerson>, onClick: { (id: number): Promise<void> }) => {
  const onDeleteHandle = () => onClick(Number(row.original.id));

  return <Button onClick={onDeleteHandle} label="Delete" />;
};

export default CellDeleteButton;
