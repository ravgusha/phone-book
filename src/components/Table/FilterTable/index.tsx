import { StyledFilterInput } from "./style";

interface IFilter {
  filter: string;
  setFilter: (filterValue: string) => void;
}
const Filter = ({ filter, setFilter }: IFilter) => {
  return <StyledFilterInput value={filter || ''} onChange={(e) => setFilter(e.target.value)} />;
};

export default Filter;
