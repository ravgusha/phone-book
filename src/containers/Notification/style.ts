import styled from 'styled-components';

import * as styles from '../../styles/styleConstants';

export const NotificationContainer = styled.div`
  width: 1280px;
  font-size: 14px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  top: 4rem;
  transition: all 10s ease-out;

  div {
    border-radius: 4px;
    box-shadow: 0 0 10px #999;
    color: #000;
    opacity: 0.9;
    transition: 0.3s ease;
    height: 65px;
    color: #fff;
    padding: 20px 15px 10px 10px;
    background-color: blue;
    margin-bottom: 20px;
  }

  & .warning {
    background-color: #c23b22;
  }

  & .success {
    background-color: ${styles.SECONDARY_COLOR};
  }

  & .error {
    background-color: #ff2015;
  }

  &:hover {
    box-shadow: 0 0 12px #fff;
    opacity: 1;
  }

  button {
    float: right;
    background: none;
    border: none;
    color: #fff;
    opacity: 0.8;
    cursor: pointer;
  }

  p {
    font-weight: 700;
    font-size: 16px;
    text-align: left;
    margin-top: 0;
    margin-bottom: 6px;
    width: 300px;
    height: 18px;
  }

  @keyframes toast-in-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;
