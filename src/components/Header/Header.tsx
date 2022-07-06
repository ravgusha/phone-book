import styled from 'styled-components';

const Container = styled.div`
  background-color: #95c7f1;
  border-radius: 5px;
  display: flex;
  align-items: end
`;

const Title = styled.h1`
  color: white;
  padding-left: 15px;
`;

const Subtitle = styled.p`
  color: white;
  padding-left: 15px;
  font-size: 24px;
  opacity: 0.5;
`;

const Header = () => {
  return (
    <Container>
      <Title>Phone book</Title>
      <Subtitle>contacts</Subtitle>
    </Container>
  );
};

export default Header;
