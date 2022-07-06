import styled from 'styled-components';
import Item from '../Item/Item';

const Container = styled.div`
  margin: 0 50px;
`;

const Title = styled.div`
  /* margin: 0 50px; */
`;

const data = [
  { firstName: 'Alex', lastName: 'Brown', phone: '+3 700 521 65', city: 'New York', id: 0 },
];

const Table = () => {
  return (
    <Container>
      <Title>Your contacts</Title>
      <table>
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Phone</th>
            <th scope="col">City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person) => (
            <Item person={person} key={person.id} />
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Table;
