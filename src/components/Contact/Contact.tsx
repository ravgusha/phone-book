import { useNavigate, generatePath } from 'react-router';
import { IPerson } from '../ContactList/ContactList';

const Contact = ({ person }) => {
  const navigate = useNavigate();
  console.log(person)
  const openPopup = (id: number) => {
    navigate(
      generatePath('edit/:id', {
        id: id.toString(),
      })
    );
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
        <a href="#">Delete</a>
      </td>
    </tr>
  );
};

export default Contact;
