import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ContactContext } from '../content';
import { IPerson } from '../types.ts';
import * as styles from '../variables';
import Contact from './Contact';

const Container = styled.div`
  margin: 0 auto;
  width: fit-content;
`;

const Title = styled.div`
  align-self: flex-start;
  font-size: ${styles.FONTSIZE_1};
  margin: 10px 0;
`;

const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  caption-side: bottom;
  font-size: ${styles.FONTSIZE_1};
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
      background-color: ${styles.MAIN_COLOR};
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
  const context = useContext(ContactContext);

  useEffect(() => {
    fetch('http://localhost:4000/contacts')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        context.setContacts(data);
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
            {context.contacts.map((person: IPerson, index) => (
              <Contact person={person} key={index} />
            ))}
          </tbody>
        </StyledTable>
      </div>
    </Container>
  );
};

export default ContactList;
