import { useContext } from 'react';
import { useNavigate, generatePath } from 'react-router';
import { ContactContext } from '../content';
import { IContact } from '../types.ts';

const Contact = ({ person }: IContact) => {
  const { contacts, setContacts } = useContext(ContactContext);
  const navigate = useNavigate();

  const openPopup = (id: number) => {
    navigate(
      generatePath('edit/:id', {
        id: id.toString(),
      })
    );
  };

  const deleteContact = (id: number) => {
    console.log('del');
    fetch(`http://localhost:4000/contacts/${id}`, {
      method: 'DELETE',
    }).then(() => {
      const filteredBooks = contacts.filter((contact) => contact.id !== id);
      setContacts([...filteredBooks]);
    });
  };

  return (
    <tr>
      <td>{person.firstName}</td>
      <td>{person.lastName}</td>
      <td>{person.phone}</td>
      <td>{person.city}</td>
      <td>
        <button onClick={() => openPopup(person.id)}>Edit</button>
      </td>
      <td>
        <button onClick={() => deleteContact(person.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Contact;
