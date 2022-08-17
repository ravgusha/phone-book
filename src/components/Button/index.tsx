import { StyledButton } from './style';

interface IButton {
  onClick?: React.MouseEventHandler;
  label: string;
}

const Button: React.FC<IButton> = ({ onClick, label }) => {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
};

export default Button;
