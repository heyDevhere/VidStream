import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Define the styled components
const NavContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 10px;
  padding-top: 20px;
  justify-content: space-evenly;
  margin-left: ${({ menuOpen }) => (menuOpen ? '150px' : '50px')};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: ${({ menuOpen }) => (menuOpen ? '150px' : '0px')};
  }
  

`;

const NavItem = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 20px;
  background-color: ${({ active, theme }) =>
    active ? theme.bgLighter : theme.soft};
  color: ${({ active, theme }) =>
    active ? theme.text : theme.textSoft};
  font-weight: ${({ active }) =>
    active ? 'bold' : 'normal'};
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: ${({ theme }) => theme.bgLighter};
  }


`;

// Create the component
const HorizontalNav = ({ menuOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { name: 'All', path: '/' },
    { name: 'Music', path: '/music' },
    { name: 'Sports', path: '/sports' },
    { name: 'Gaming', path: '/gaming' },
    { name: 'Movies', path: '/movies' },
    { name: 'News', path: '/news' }
  ];


  const getItemsForViewport = () => {
    if ( window.innerWidth <= 768) {
      return [
        { name: 'All', path: '/' },
        { name: 'Music', path: '/music' },
        { name: 'Sports', path: '/sports' }
      ];
    } else {
      return items; // Default to full items array if conditions are not met
    }
  };

  const displayedItems = getItemsForViewport();

  return (
    <NavContainer menuOpen={menuOpen}>
      {displayedItems.map((item, index) => (
        <NavItem
          key={index}
          to={item.path}
          active={index === activeIndex}
          onClick={() => setActiveIndex(index)}
        >
          {item.name}
        </NavItem>
      ))}
    </NavContainer>
  );
};

export default HorizontalNav;
