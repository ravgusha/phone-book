import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: #fff;
  padding: 4px;
  background-color: #9ed3ff;
  font-size: 24px;
  text-decoration: none;
  border: none;
  border-radius: 6px;
  text-align: center;

  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }
`;

export default StyledLink;
