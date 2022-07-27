import { useNavigate } from 'react-router-dom';

import Logo from './Logo';
import { AddButton, Container} from './style';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo />
      <AddButton
        onClick={() => {
          navigate('/add');
        }}
      >
        Add new contact
      </AddButton>
    </Container>
  );
};

export default Header;
