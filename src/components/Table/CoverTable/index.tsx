import { StyledCoverTable } from './style';
import emptyImage from '../../assets/empty.png';

const CoverTable = () => {
  return (
    <StyledCoverTable>
      <img src={emptyImage} />
    </StyledCoverTable>
  );
};

export default CoverTable;
