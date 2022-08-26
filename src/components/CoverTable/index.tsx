import { StyledCoverTable } from './style';
import emptyImage from '../../assets/empty.png';

const CoverTable = () => {
  return (
    <StyledCoverTable>
      <img src={emptyImage} />
      <div>
        <h2>No contacts to display</h2>
        <p>Would you like to add one now?</p>
      </div>
    </StyledCoverTable>
  );
};

export default CoverTable;
