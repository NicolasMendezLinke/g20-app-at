import styled from "styled-components";

const LoadingText = styled.p`
  font-size: 1.2em;
  color: #666;
`;

const Loading = () => {
  return <LoadingText>Aguarde um momento...</LoadingText>;
};

export default Loading;
