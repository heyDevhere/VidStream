import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

// Define the styled components
const NavContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  padding-bottom: 10px;
  padding-top: 20px;
  width: 100%;
  justify-content: space-between;
  margin-left: ${({ menuOpen }) => (menuOpen ? "100px" : "0px")};
  transition: margin-left 0.3s ease;
  background-color: ${({ theme }) => theme.bg};
  z-index: 110;

  @media (max-width: 768px) {
    margin-left: ${({ menuOpen }) => (menuOpen ? "150px" : "0px")};
    z-index: 999;
    margin-bottom: 112px;
  }
`;

const ItemsWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  flex-grow: 1;
  justify-content: space-evenly;
`;

const NavItem = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 20px;
  background-color: ${({ active, theme }) =>
    active ? theme.bgLighter : theme.soft};
  color: ${({ active, theme }) => (active ? theme.text : theme.textSoft)};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;

  &:last-child {
    margin-right: ${({ menuOpen }) => (menuOpen ? "10px" : "30px")};
    @media (max-width: 768px) {
      margin-right: ${({ menuOpen }) => (menuOpen ? "0px" : "0px")};
    }
  }

  &:first-child {
    margin-left: ${({ menuOpen }) => (menuOpen ? "10px" : "30px")};
    @media (max-width: 768px) {
      margin-left: ${({ menuOpen }) => (menuOpen ? "0px" : "0px")};
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.bgLighter};
  }

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  color: ${({ theme }) => theme.text};
  transition: color 0.3s;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    color: ${({ theme }) => theme.textSoft};
  }
`;

// Create the component
const HorizontalNav = ({ menuOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsWrapperRef = useRef(null);

  const items = [
    { name: "All", path: "/" },
    { name: "Music", path: "/music" },
    { name: "Sports", path: "/sports" },
    { name: "Gaming", path: "/gaming" },
    { name: "Movies", path: "/movies" },
    { name: "News", path: "/news" },
  ];

  const handleScroll = (direction) => {
    const container = itemsWrapperRef.current;
    const scrollAmount = container.clientWidth / 2;

    if (direction === "left") {
      if (container.scrollLeft === 0) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollTo({
          left: container.scrollLeft - scrollAmount,
          behavior: "smooth",
        });
      }
    } else {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollTo({
          left: container.scrollLeft + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <NavContainer menuOpen={menuOpen}>
      <ArrowButton onClick={() => handleScroll("left")}>
        <ArrowCircleLeftIcon />
      </ArrowButton>
      <ItemsWrapper id="items-wrapper" ref={itemsWrapperRef}>
        {items.map((item, index) => (
          <NavItem
            key={index}
            to={item.path}
            active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            {item.name}
          </NavItem>
        ))}
      </ItemsWrapper>
      <ArrowButton onClick={() => handleScroll("right")}>
        <ArrowCircleRightIcon />
      </ArrowButton>
    </NavContainer>
  );
};

export default HorizontalNav;
