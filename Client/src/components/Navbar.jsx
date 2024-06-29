import React from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import SearchIcon from "@mui/icons-material/Search";
import Upload from "./Upload";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notify from "./Notify";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Tube from "../img/Capture-removebg-previews.png";

const Dev = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const SearchIconWrapper = styled(SearchIcon)`
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  width: 100vw;
  z-index: 1000;
  /* width: ${({ menuOpen }) =>
    menuOpen ? "" : "100vw"}; Adjust width based on menuOpen state */
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 20px;

  @media (max-width: 768px) {
    /* flex-direction: column; */
    padding: 0px 13px;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    width: 50%;
    left:9px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 25px;
  padding: 5px 10px;
  border: ${({ isFocused, theme }) => (isFocused ? `2px solid ${theme.text}` : 'none')}; // Conditional border
  margin:auto;

`;

const Input = styled.input`
  border: none;
  flex: 1;
  outline: none;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  padding: 8px;
  font-size: 16px;
  

  @media (max-width: 768px) {
    width: 48px;
  }
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  margin: 0px 2px;
  margin-left: 13px;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 768px) {
    padding: 10px;
    width: 100%;
    display: none;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    justify-content: flex-start;
    width: 100%;
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;

  @media (max-width: 769px) {
    &:hover::after {
      content: "${(props) => props.userName}";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      white-space: nowrap;
      z-index: 10000;
    }
  }
`;

const Notifiy = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 15px;

  margin-right: ${({ currentUser }) => (currentUser ? "50px" : "10px")};

  color: ${({ theme }) => theme.text};
  z-index: 4000;

  @media (max-width: 768px) {
    /* align-items: flex-end; */
    /* left:240px; */
    margin-right: ${({ currentUser }) => (currentUser ? "80px" : "10px")};
    z-index: 4000;

  }
`;

const Badge = styled.div`
  position: absolute;
  bottom: 28px;
  background-color: red;
  color: ${({ theme }) => theme.text};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;

  @media (max-width: 768px) {
    bottom: 28px;
    right: 110px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  margin-left: 15px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    margin-left: 29px;
    .logo-text {
      display: none; /* Hide the text on small screens */
    }
  }
`;

const Img = styled.img`
  cursor: pointer;
  height: 25px;
`;

const Navbar = ({ toggleMenu, menuOpen }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [videoCount, setVideoCount] = useState(0);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  

  useEffect(() => {
    if (currentUser) {
      const fetchVideos = async () => {
        try {
          const notificationsResponse = await axios.get(
            "https://vidstream-mfy7.onrender.com/api/notify/getNotifications",
            {
              withCredentials: true,
            }
          );

          if (notificationsResponse.status !== 200) {
            console.log("shit");
          } else {
            console.log("Notifications fetched successfully", notificationsResponse.data);
          }


          // const notifications = await notificationsResponse.json();
          const notifications = notificationsResponse.data;

          const videoIds = Array.from(new Set(notifications.map(
            (notification) => notification.videoId._id
          )));

          const videoDetailsPromises = videoIds.map((videoId) =>
            axios.get(
              `https://vidstream-mfy7.onrender.com/api/videos/find/${videoId}`,
              {
                withCredentials: true,
              }
            )
          );

          const videoDetailsResponses = await Promise.all(videoDetailsPromises);
          const videoDetails = videoDetailsResponses.map(
            (response) => response.data
          );
          setVideoCount(videoIds.length);
        } catch (e) {
          // toast.error("No Notifications available");
          console.log(e);
        }
      };
      fetchVideos();
    }
  }, [location]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${q}`);
    }
  };

  // this returns a object literal
  // const userInfo= () => ({
  //   navigate("/video/userInfo");
  // });

  // This syntax executes the statement inside the function body.
  const userInfo = () => {
    navigate(`/video/userInfo/${currentUser._id}`);
  };

  const handleNot = async () => {
    if (currentUser) {
      setNotificationOpen(!notificationOpen);
    } else {
      toast.error("login first!");
    }
  };

  const MenuIconWrapper = styled(MenuIcon)`
    position: absolute;
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    left: ${({ menuOpen }) => (menuOpen ? "5px" : "5px")};
    transition: left 0.3s ease;

    @media (max-width: 768px) {
      left: 10px;
    }
  `;

  return (
    <>
      <Container>
        <Wrapper>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>
              <Img src={Tube} />
              <span className="logo-text">VidStream</span>
            </Logo>
          </Link>

          <MenuIconWrapper onClick={toggleMenu} />
          {currentUser /* Conditionally render logout button */ && (
            <Button onClick={handleLogout}>Logout</Button>
          )}

          <Search>
            <SearchContainer isFocused={isFocused}>
              <Input
                placeholder="Search"
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <SearchIconWrapper onClick={() => navigate(`/search?q=${q}`)} />
            </SearchContainer>
          </Search>
          <Notifiy>
            <NotificationsIcon sx={{ cursor: "pointer" }} onClick={handleNot} />
            {videoCount > 0 && { currentUser } && <Badge>{videoCount}</Badge>}
          </Notifiy>

          {notificationOpen && (
            <Notify
              setVideoCount={setVideoCount}
              setNotificationOpen={setNotificationOpen}
            />
          )}

          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon
                sx={{ cursor: "pointer", margin: "2px" }}
                onClick={() => setOpen(true)}
              />
              <Avatar
                src={currentUser.img}
                onClick={userInfo}
                userName={currentUser.name}
              />
              {!isSmallScreen && (
                <Dev onClick={userInfo}>{currentUser.name}</Dev>
              )}
            </User>
          ) : (
            <>
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </>
          )}
        </Wrapper>
      </Container>
      {open && (
        <Upload
          setOpen={setOpen}
          setNotificationOpen={setNotificationOpen}
          setVideoCount={setVideoCount}
          toggleMenu={toggleMenu}
          menuOpen={menuOpen}
        />
      )}
    </>
  );
};

export default Navbar;