import React from "react";
import styled from "styled-components";
import Tube from "../img/Capture-removebg-previews.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { logout } from "../redux/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Box } from '@mui/material';
import Subscriptions from "./Subscriptions";


import { toast } from "react-toastify";

const Container = styled.div`
  flex: 2;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};

  font-size: 14px;
  position: fixed;
  overflow-y: auto;
  overflow-x: auto;
  z-index: 1000;
  width: 200px;
  height: 100vh;
  /* display: ${({ menuOpen }) => (menuOpen ? "block" : "none")}; */
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: ${({ menuOpen }) =>
    menuOpen ? "translateX(0)" : "translateX(-100%)"};
  opacity: ${({ menuOpen }) => (menuOpen ? 1 : 0)};
  pointer-events: ${({ menuOpen }) => (menuOpen ? "auto" : "none")};
  @media (max-width: 768px) {
    position: fixed;
    width: 100%;
    left: ${({ menuOpen }) => (menuOpen ? "0" : "100%")};
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform: ${({ menuOpen }) =>
      menuOpen ? "translateX(0)" : "translateX(-100%)"};
    opacity: ${({ menuOpen }) => (menuOpen ? 1 : 0)};
    pointer-events: ${({ menuOpen }) => (menuOpen ? "auto" : "none")};
    z-index: 1000;
  }

  ::-webkit-scrollbar {
    cursor: pointer;

    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    cursor: pointer;

    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    cursor: pointer;

    /* background: #888; */
    background: ${({ theme }) => theme.soft};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    cursor: pointer;

    background: #555;
  }
`;

const Wrapper = styled.div`
  padding: 18px 26px;
  overflow-y: auto;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;


const Items = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  font-size: large;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;


const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Menu = ({ darkMode, setDarkMode, menuOpen, toggleMenu }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  };

  const handleLogout = () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
    dispatch(logout());
    navigate("/");
  };

  const handleSubscriptionClick = (e) => {
    scrollToTop();
    if (!currentUser) {
      e.preventDefault();
      toast.error("Please login first !");
    }
  };

  const fordev = () => {
    scrollToTop();
    setDarkMode(!darkMode);
    handleClick();
  };

  return (
    <Container menuOpen={menuOpen}>
      <Wrapper>
        {/* <Link to="/" style={{ textDecoration: "none", color: "inherit" }} >
          <Logo>
            <Img src={Tube} />
            VidStream
          </Logo>
        </Link> */}
        <Link
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={scrollToTop}
        >
          <Item onClick={handleClick}>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Link
          to="trends"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={scrollToTop}
        >
          <Item onClick={handleClick}>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleSubscriptionClick}
        >
          <Item onClick={handleClick}>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>
        <Link
          to="history"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleSubscriptionClick}
        >
          <Item onClick={handleClick}>
            <HistoryOutlinedIcon />
            History
          </Item>
        </Link>

        <Link
          to="watchlater"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleSubscriptionClick}
        >
          <Item onClick={handleClick}>
            <WatchLaterOutlinedIcon />
            Watch Later
          </Item>
        </Link>

        {!currentUser ? (
          <>
            <Login>
              <Link
                to="signin"
                style={{ textDecoration: "none" }}
                onClick={scrollToTop}
              >
                <Button onClick={handleClick}>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
          </>
        ) : (
          <Login>
            <Link
              to="signin"
              style={{ textDecoration: "none" }}
              onClick={scrollToTop}
            >
              <Button onClick={handleLogout}>
                <AccountCircleOutlinedIcon />
                SIGN OUT
              </Button>
            </Link>
          </Login>
        )}

        {/* <Title>BEST OF LAMATUBE</Title> */}
        <Item onClick={fordev}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>

        <Hr />

        

        <Subscriptions/>

        <Link
          to="/music"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={scrollToTop}
        >
          <Item onClick={handleClick}>
            <LibraryMusicOutlinedIcon />
            Music
          </Item>
        </Link>
        <Link
          to="/sports"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={scrollToTop}
        >
          <Item onClick={handleClick}>
            <SportsBasketballOutlinedIcon />
            Sports
          </Item>
        </Link>
        <Link
          to="/gaming"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={scrollToTop}
        >
          <Item onClick={handleClick}>
            <SportsEsportsOutlinedIcon />
            Gaming
          </Item>
        </Link>
        <Link
          to="/movies"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={scrollToTop}
        >
          <Item onClick={handleClick}>
            <MovieOutlinedIcon />
            Movies
          </Item>
        </Link>
        <Link
          to="/news"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={scrollToTop}
        >
          <Item onClick={handleClick}>
            <ArticleOutlinedIcon />
            News
          </Item>
        </Link>

        
      </Wrapper>
    </Container>
  );
};

export default Menu;
