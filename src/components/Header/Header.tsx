import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #95c7f1;
  border-radius: 5px;
  display: flex;
  align-items: end;
  width: 100%;
  justify-content: space-between;
`;

const MainButton = styled.button`
  color: white;
  font-size: 34px;
  align-self: flex-end;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding-left: 15px;
`;

const AddButton = styled.button`
  color: white;
  padding-right: 15px;
  font-size: 24px;
  align-self: flex-end;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

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
