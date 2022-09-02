import styled from 'styled-components';

import * as styles from '../../styles/styleConstants';

export const StyledButton = styled.button`
  color: #fff;
  font-size: 24px;
  border: none;
  border-radius: 6px;
  background-color: ${styles.MAIN_COLOR};
  margin: 8px 0;

  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }
`;
