import styled from 'styled-components';

import * as styles from '../../styles/styleConstants';

export const StyledForm = styled.form`
  width: 450px;
  padding: 25px;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

  div {
    padding: 15px 0 0 0;
  }
`;

export const Logo = styled.img`
  width: 55px;
  height: 55px;
  color: ${styles.SECONDARY_COLOR};
  align-self: center;
`;

export const StyledLink = styled.a`
  align-self: center;
  color: grey;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
