import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentContact } from '../../redux/slice';
import { AddButton, Container, MainButton } from './style';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Container>
      <MainButton
        onClick={() => {
          navigate('/');
          dispatch(setCurrentContact(null));
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
