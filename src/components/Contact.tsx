import { useNavigate, generatePath } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { IState } from '../redux/types';
import { setContacts, setCurrentContact } from '../redux/slice';
import { IContact } from '../types';

const Contact = ({ person }: IContact) => {
  const contacts = useSelector((state: IState) => state.contacts);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const editContact = (id: number) => {
    console.log(id);
    dispatch(setCurrentContact(id));
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
        dispatch(setContacts([...filteredBooks]));
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
        <a onClick={() => editContact(person.id)}>Edit</a>
      </td>
      <td>
        <button onClick={() => deleteContact(person.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Contact;
