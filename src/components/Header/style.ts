import styled from 'styled-components';

import * as styles from '../../variables';

export const Container = styled.div`
  background-color: ${styles.MAIN_COLOR};
  border-radius: 5px;
  display: flex;
  align-items: end;
  width: 100%;
  justify-content: space-between;
`;

export const StyledLogo = styled.button`
  padding-left: 15px;
  color: white;
  background-color: transparent;
  font-size: 34px;
  align-self: flex-end;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${styles.SECONDARY_COLOR};
    font-weight: bold;
  }
`;
