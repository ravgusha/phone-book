import { useNavigate } from 'react-router-dom';
import { AddButton, Container, MainButton } from './style';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <MainButton
        onClick={() => {
          navigate('/');
        }}
      >
        Phone book
      </MainButton>
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
