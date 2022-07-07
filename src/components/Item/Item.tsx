import { IPerson } from "../Table/Table";

const Item = ({person}: IPerson) => {
    console.log(person)
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

export default Item;
