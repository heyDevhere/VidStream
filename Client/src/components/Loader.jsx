import React from 'react';
import styled, { keyframes } from 'styled-components';

// Styled component for the loader container
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full viewport height */
`;

// Styled component for the loader animation
const LoaderAnimation = styled.div`
  border: 4px solid ${({ theme }) => theme.bg}; /* Light gray border */
  border-top: 4px solid ${({ theme }) => theme.bg}; /* Blue border on top */
  border-radius: 50%; /* Rounded border */
  width: 50px; /* Width of the loader */
  height: 50px; /* Height of the loader */
  animation: spin 1s linear infinite; /* Spin animation */
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Loader component
const Loader = () => (
  <LoaderContainer>
    <LoaderAnimation />
  </LoaderContainer>
);

export default Loader;
