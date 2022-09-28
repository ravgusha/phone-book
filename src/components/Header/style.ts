import styled from 'styled-components';

import * as styles from '../../styles/styleConstants';

export const Container = styled.div`
  background-color: ${styles.MAIN_COLOR};
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
`;

export const StyledLogo = styled.button`
  padding-left: 15px;
  color: white;
  background-color: transparent;
  font-size: 34px;
  align-self: center;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${styles.SECONDARY_COLOR};
    font-weight: bold;
  }
`;

export const HeaderLink = styled.div`
  padding: 0 6px;
  margin-right: 10px;
  font-size: 24px;
  color: white;
  border: 1px solid white;
  border-radius: 6px;
  align-self: center;
  cursor: pointer;

  &:hover {
    color: ${styles.SECONDARY_COLOR};
    font-weight: bold;
    border: 1px solid ${styles.SECONDARY_COLOR};
  }
`;

export const StyledName = styled.p`
  padding: 0 6px;
  margin-right: 10px;
  font-size: 24px;
  color: ${styles.SECONDARY_COLOR};
  font-weight: 700;
`;
