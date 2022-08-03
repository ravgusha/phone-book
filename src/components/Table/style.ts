import styled from 'styled-components';

import * as styles from '../../variables';

const Styles = styled.div`
  margin: 0 auto;
  width: fit-content;

  table {
    caption-side: top;
    border: none;
    border-collapse: collapse;
    caption-side: bottom;
    font-size: ${styles.FONTSIZE_1};

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

    tr {
      :hover {
        background-color: ${styles.MAIN_COLOR};
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      /* border: 1px solid black; */
    }
  }
`;

export default Styles;
