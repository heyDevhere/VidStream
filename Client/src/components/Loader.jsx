import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for fade-in and fade-out animations
const fadeInOut = keyframes`
  0%, 20% { opacity: 0; }
  10% { opacity: 1; }
  30%, 50% { opacity: 0; }
  40% { opacity: 1; }
  60%, 100% { opacity: 0; }
`;

// Styled component for the loader container
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

// Styled component for each letter
const Letter = styled.div`
  font-size: 4rem; // Adjust font size
  font-weight: bold;
  color: #61dafb; // Color of the letters
  opacity: 0;
  animation: ${fadeInOut} 2s infinite;
  animation-delay: ${({ delay }) => delay};
`;

// Loader component
const Loader = () => (
  <LoaderContainer>
    <Letter delay="0s">D</Letter>
    <Letter delay="1s">M</Letter>
  </LoaderContainer>
);

export default Loader;
