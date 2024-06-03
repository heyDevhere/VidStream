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

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Container = styled.div`
  flex: 2;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  overflow-y: auto;
  height: 1000vh;
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
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

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);

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
  };

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }} >
          <Logo>
            <Img src={Tube} />
            VidStream
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={scrollToTop}>
          <Item>
            <HomeIcon />
            Home
          </Item>
          
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }} onClick={scrollToTop}>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleSubscriptionClick}
        >
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>
        <Link
          to="history"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleSubscriptionClick}
        >
          <Item>
            <HistoryOutlinedIcon />
            History
          </Item>
        </Link>

        <Link
          to="watchlater"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleSubscriptionClick}
        >
          <Item>
            <WatchLaterOutlinedIcon />
            Watch Later
          </Item>
        </Link>

        {!currentUser && (
          <>
            <Login>
              <Link to="signin" style={{ textDecoration: "none" }} onClick={scrollToTop}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
          </>
        )}
        <Hr />

        {/* <Title>BEST OF LAMATUBE</Title> */}
        <Item onClick={fordev} >
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
        <Link to="/music" style={{ textDecoration: "none" ,color: "inherit" }} onClick={scrollToTop}>
          <Item>
            <LibraryMusicOutlinedIcon />
            Music
          </Item>
        </Link>
        <Link to="/sports" style={{ textDecoration: "none" ,color: "inherit" }} onClick={scrollToTop}>

        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        </Link>
        <Link to="/gaming" style={{ textDecoration: "none" ,color: "inherit" }} onClick={scrollToTop}>

        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        </Link>
        <Link to="/movies" style={{ textDecoration: "none" ,color: "inherit" }} onClick={scrollToTop}>

        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        </Link>
        <Link to="/news" style={{ textDecoration: "none" ,color: "inherit"}} onClick={scrollToTop}>

        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        </Link>

        <Item>
          {/* <FlagOutlinedIcon />
          Report */}
        </Item>
        {/* <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>  */}
      </Wrapper>
    </Container>
  );
};

export default Menu;
