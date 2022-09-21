import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { Container, HeaderLink } from './style';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo />
      <HeaderLink
        onClick={() => {
          navigate('/signin');
        }}
      >
        Sign in
      </HeaderLink>
    </Container>
  );
};

export default Header;
