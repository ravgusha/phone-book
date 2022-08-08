import styled from 'styled-components';

import * as styles from '../../variables';

const Container = styled.div`
  margin: 0 auto;
  width: fit-content;
  display: flex;
  flex-direction: column;

  table {
    caption-side: top;
    border: none;
    border-collapse: collapse;
    caption-side: bottom;
    font-size: ${styles.FONTSIZE_1};
    margin-bottom: 7px;

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
  }
`;

export default Container;
