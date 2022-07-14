import { useContext } from 'react';
import { useNavigate, generatePath } from 'react-router';
import { ContactContext } from '../content';
import { IContact } from '../types.ts';

const Contact = ({ person }: IContact) => {
  const { contacts, setContacts, setCurrentContact } = useContext(ContactContext);
  const navigate = useNavigate();

  const editContact = (id: number) => {
    setCurrentContact(id);
    navigate(
      generatePath('edit/:id', {
        id: id.toString(),
      })
    );
  };

  const deleteContact = (id: number) => {
    fetch(`http://localhost:4000/contacts/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        alert('Contact deleted!');
        const filteredBooks = contacts.filter((contact) => contact.id !== id);
        setContacts([...filteredBooks]);
      }
    });
  };

  return (
    <tr>
      <td>{person.firstName}</td>
      <td>{person.lastName}</td>
      <td>{person.phone}</td>
      <td>{person.city}</td>
      <td>
        <button onClick={() => editContact(person.id)}>Edit</button>
      </td>
      <td>
        <button onClick={() => deleteContact(person.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Contact;