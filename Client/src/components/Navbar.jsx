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
import { useLocation } from 'react-router-dom';


const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 1000; /* Ensure navbar stays on top */
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Dev = styled.div`
  cursor:pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Notifiy = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 5px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  z-index: 4000;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ currentUser }) =>
    currentUser ? "flex-start" : "center"};
  flex-grow: 1;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: 1px solid white;
  width: 220px;
  background-color: transparent;
  outline: none;
  margin: 2px 2px;
  height: 25px;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.text};
`;

const SearchIconWrapper = styled(SearchIcon)`
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  margin: 0px 2px;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Badge = styled.div`
  position: absolute;
  bottom: 28px;
  /* right: ${({ currentUser }) => (currentUser ? "199px" : "145px")}; */
  background-color: red;
  color: ${({ theme }) => theme.text};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [videoCount, setVideoCount] = useState(0);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const location = useLocation();


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     if (currentUser) {
  //       try {
  //         const notifyres = await axios.get(`notify/getNotifications`);
  //         const fetchedVideos = notifyres.data.flat(); // Flatten the array of arrays
  //         const videoIds = fetchedVideos.map(notification => notification.videoId._id);
  //         console.log("asiuefwh");
  //         console.log(fetchedVideos);

  //         const sortedVideos = fetchedVideos.sort(
  //           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //         ); 
  //         setVideoCount(sortedVideos.length);
  //       } catch (err) {
  //         toast.error("No Notifications");
  //       }
  //       fetchVideos();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    if(currentUser){
    const fetchVideos = async () => {
      try {
        const notificationsResponse = await fetch("/notify/getNotifications");
        const notifications = await notificationsResponse.json();

        const videoIds = notifications.map(
          (notification) => notification.videoId._id
        );


        const videoDetailsPromises = videoIds.map(videoId =>
          axios.get(`https://vidstream-mfy7.onrender.com/api/videos/find/${videoId}`)
        );
    
        const videoDetailsResponses = await Promise.all(videoDetailsPromises);
        const videoDetails = videoDetailsResponses.map(response => response.data);
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

  return (
    <>
      <Container>
        <Wrapper>
          {currentUser /* Conditionally render logout button */ && (
            <Button onClick={handleLogout}>Logout</Button>
          )}

          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <SearchIconWrapper onClick={() => navigate(`/search?q=${q}`)} />
          </Search>
          <Notifiy>
            <NotificationsIcon
              sx={{ cursor: "pointer" }}
              onClick={handleNot}
            />
            {videoCount > 0 && {currentUser} &&  <Badge>{videoCount}</Badge>}
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
              <Avatar src={currentUser.img} onClick={userInfo} />
               <Dev onClick={userInfo}>
              {currentUser.name}
              </Dev>
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
        />
      )}
    </>
  );
};

export default Navbar;
