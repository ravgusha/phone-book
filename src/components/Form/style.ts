import styled from 'styled-components';
import * as styles from '../../variables';

export const Container = styled.div`
  height: 94vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 450px;
  padding: 25px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  background-color: #fff;

  p {
    color: red;
    font-size: 14px;
  }
`;

export const Submit = styled.button`
  background-color: ${styles.SECONDARY_COLOR};
  text-transform: uppercase;
  outline: 0;
  border: 0;
  padding: 10px;
  color: #ffffff;
  font-size: 14px;
  margin-top: 15px;
  cursor: pointer;
`;

export const Logo = styled.img`
  width: 55px;
  height: 55px;
  align-self: center;
  color: #639cd9;
  margin-bottom: 21px;
`;

export const StyledLabel = styled.label`
  padding-top: 25px;
`;

export const StyledInput = styled.input`
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`;

