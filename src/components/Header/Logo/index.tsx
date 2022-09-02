import { useNavigate } from 'react-router';

import { StyledLogo } from '../style';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <StyledLogo
      onClick={() => {
        navigate('/');
      }}
    >
      Phone book
    </StyledLogo>
  );
};

export default Logo;
