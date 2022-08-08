import { useNavigate } from 'react-router-dom';

import Logo from './Logo';
import { Container} from './style';

const Header = () => {
  return (
    <Container>
      <Logo />
    </Container>
  );
};

export default Header;
