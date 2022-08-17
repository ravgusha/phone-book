import StyledLink from './style';

interface ILink {
  to: string;
  label?: string | number;
}

const Link = ({ to, label }: ILink) => {
  return <StyledLink to={to}>{label}</StyledLink>;
};

export default Link;
