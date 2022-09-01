import styled from 'styled-components';

const StyledComponentWrapper = styled.div`
  width: fit-content;
  height: calc(100vh - 53px);
  margin: ${(props) => props.theme.mg};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.theme.jc};
`;

StyledComponentWrapper.defaultProps = {
  theme: {
    jc: 'center',
    mg: '0 auto'
  },
};

export default StyledComponentWrapper;
