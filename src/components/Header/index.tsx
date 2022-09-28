import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { IState } from '../../containers/Notification';
import { setNotification } from '../../redux/notificationSlice';
import { deleteUserInformation } from '../../redux/userSlice';
import { Container, HeaderLink, StyledName } from './style';
import Logo from './Logo';

const Header = () => {
  const isLoggedIn = useSelector((state: IState) => state.userSlice.isLoggedIn);
  const name = useSelector((state: IState) => state.userSlice.name);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(deleteUserInformation());
    localStorage.removeItem('token');
    navigate('/contacts');
    dispatch(
      setNotification({
        message: 'You are successfully logged out',
        type: 'success',
        id: uuidv4(),
      })
    );
  };

  return (
    <Container>
      <Logo />
      {isLoggedIn ? (
        <div>
          <StyledName>{name}</StyledName>
          <HeaderLink
            onClick={() => {
              logout();
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
