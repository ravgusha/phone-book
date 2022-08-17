import styled from 'styled-components';

import * as styles from '../../styleConstants';

const StyledTable = styled.table`
  margin-bottom: 7px;
  font-size: ${styles.FONTSIZE_1};
  border: none;
  border-collapse: collapse;
  caption-side: top;
  caption-side: bottom;

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: ${styles.MAIN_COLOR};
    }
  }

  thead > tr:nth-of-type(2) {
    background-color: #c2c2c2;
  }

  tr:not(:first-child) {
    :hover {
      background-color: ${styles.MAIN_COLOR};
    }
  }

  th,
  td {
    margin: 0;
    padding: 0.5rem;
  }
`;

export default StyledTable;
