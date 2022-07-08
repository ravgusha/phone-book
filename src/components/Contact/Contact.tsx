import { IPerson } from "../ContactList/ContactList";

const Contact = ({person}) => {
  return (
    <tr>
      <td>{person.firstName}</td>
      <td>{person.lastName}</td>
      <td>{person.phone}</td>
      <td>{person.city}</td>
      <td>
        <a href="#">Edit</a>
      </td>
      <td>
        <a href="#">Delete</a>
      </td>
    </tr>
  );
};

export default Contact;
