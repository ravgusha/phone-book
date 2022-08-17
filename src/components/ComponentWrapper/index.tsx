import Spinner from '../Spinner';
import StyledComponentWrapper from './style';

interface IWrapper {
  children: JSX.Element[] | JSX.Element;
  isLoading?: boolean;
}

const ComponentWrapper = ({ isLoading, children }: IWrapper) => {
  return isLoading ? <Spinner />: <StyledComponentWrapper>{children}</StyledComponentWrapper>;
};

export default ComponentWrapper;
