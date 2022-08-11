import { Row, Cell } from "react-table";

import { IPerson } from "../../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CellEditButton = (row: Row<IPerson>, onClick: any) => {
  return (
    <div>
      <a onClick={() => onClick(row.original.id)}>Edit</a>
    </div>
  );
};

export default CellEditButton;
