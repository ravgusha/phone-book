import styled from 'styled-components';
import * as styles from '../../../styleConstants';

export const Container = styled.div`
  height: 94vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledForm = styled.form`
  width: 450px;
  padding: 25px;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

export const Submit = styled.button`
  padding: 10px;
  margin-top: 15px;
  color: #ffffff;
  background-color: ${styles.SECONDARY_COLOR};
  font-size: 14px;
  outline: 0;
  border: 0;
  text-transform: uppercase;
  cursor: pointer;
`;

export const Logo = styled.img`
  width: 55px;
  height: 55px;
  margin-bottom: 21px;
  color: #639cd9;
  align-self: center;
`;
