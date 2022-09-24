import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IState } from '../../containers/Notification';
import Logo from './Logo';
import { Container, HeaderLink, StyledName } from './style';

const Header = () => {
  const isLoggedIn = useSelector((state: IState) => state.slice.isLoggedIn);
  const name = useSelector((state: IState) => state.slice.name);
  const navigate = useNavigate();

  return (
    <Container>
      <Logo />
      {isLoggedIn ? (
        <div>
          <StyledName>{name}</StyledName>
          <HeaderLink
            onClick={() => {
              // navigate('/login');
            }}
          >
            Logout
          </HeaderLink>
        </div>
      ) : (
        <HeaderLink
          onClick={() => {
            navigate('/login');
          }}
        >
          Login
        </HeaderLink>
      )}
    </Container>
  );
};

export default Header;
