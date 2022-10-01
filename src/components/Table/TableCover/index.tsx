import { StyledTableCover } from './style';
import emptyImage from '../../../assets/empty.png';

const TableCover = () => {
  return (
    <StyledTableCover>
      <img src={emptyImage} />
    </StyledTableCover>
  );
};

export default TableCover;
