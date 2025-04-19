import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  background-image: linear-gradient(to bottom, rgb(50, 50, 50), rgb(20, 20, 20));
  opacity: 0.5;
  /* backdrop-filter: blur(20px); */
`;
