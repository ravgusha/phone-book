import StyledComponentWrapper from './style';

interface IWrapper {
    children: JSX.Element[] | JSX.Element
}

const ComponentWrapper = ({ children }: IWrapper) => {
  return <StyledComponentWrapper>{children}</StyledComponentWrapper>;
};

export default ComponentWrapper;
