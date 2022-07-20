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

export const MainButton = styled.button`
  color: white;
  font-size: 34px;
  align-self: flex-end;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding-left: 15px;

  &:hover {
    color: ${styles.SECONDARY_COLOR};
    font-weight: bold;
  }
`;

export const AddButton = styled.button`
  color: white;
  padding-right: 15px;
  font-size: ${styles.FONTSIZE_1};
  align-self: flex-end;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${styles.SECONDARY_COLOR};
    font-weight: bold;
  }
`;
