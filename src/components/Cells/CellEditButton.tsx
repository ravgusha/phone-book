import { Link } from 'react-router-dom';

const CellEditButton = (id: string) => {
  return <Link to={'/contacts/form/' + id}>Edit</Link>;
};

export default CellEditButton;
