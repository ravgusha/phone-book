import styled from 'styled-components';
import Item from '../Item/Item';

const Container = styled.div`
  margin: 0 auto;
  width: fit-content;
`;

const Title = styled.div`
  align-self: flex-start;
  font-size: 25px;
  margin: 10px 0;
`;

const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  caption-side: bottom;
  font-size: 24px;
  td,
  th {
    border: none;
  }
  td {
    padding: 5px 10px;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: #95c7f1;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

const data = 

const Table = () => {
  return (
    <Container>
      <div>
        <Title>Your contacts</Title>
        <StyledTable>
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone</th>
              <th scope="col">City</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((person) => (
              <Item person={person} key={person.id} />
            ))}
          </tbody>
        </StyledTable>
      </div>
    </Container>
  );
};

export default Table;
