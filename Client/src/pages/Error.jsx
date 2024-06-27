import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  justify-content:center;
`;

const Title = styled.h3`
  text-align: center;
  align-items:center;
  justify-content:center;
  color: ${({ theme }) => theme.text};
  margin-bottom: 15px;

`;

const Error = () => {
  
  return (
    <Container>
      <Title>Enter Correct URL Please / Upload valid image,video</Title>
    </Container>
  );
};

export default Error;



