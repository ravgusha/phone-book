import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { setCurrentContact } from '../../../redux/slice';
import { StyledLogo } from '../style';

const Logo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <StyledLogo
      onClick={() => {
        navigate('/');
        dispatch(setCurrentContact(null));
      }}
    >
      Phone book
    </StyledLogo>
  );
};

export default Logo;
