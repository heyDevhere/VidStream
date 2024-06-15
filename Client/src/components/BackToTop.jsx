// src/components/BackToTop.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Button = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  display: ${({ show }) => (show ? "block" : "none")};
  z-index: 1000;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button onClick={scrollToTop} show={showButton}>
      <ArrowUpwardIcon />
    </Button>
  );
};

export default BackToTop;
