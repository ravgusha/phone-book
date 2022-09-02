import Link from '../Link';

const CellEditButton = (id: string) => {
  return <Link to={'/contacts/form/' + id} label={'Edit'} />;
};

export default CellEditButton;
