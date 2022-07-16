import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setContacts } from '../../redux/slice';
import { IState } from '../../redux/types';
import { IPerson } from '../../types';
import Contact from '../Contact/Contact';

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

const ContactList = () => {
  const contacts = useSelector((state: IState) => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:4000/contacts')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setContacts(data));
      });
  }, []);

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
            {contacts.map((person: IPerson, index: number) => (
              <Contact person={person} key={index} />
            ))}
          </tbody>
        </StyledTable>
      </div>
    </Container>
  );
};

export default ContactList;
