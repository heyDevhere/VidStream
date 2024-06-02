import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchSuccess } from "../redux/videoSlice";
import app from "../firebase";
import { useDispatch } from "react-redux";
import Notifycard from "./Notifycard";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const Scrollbar = styled.div``;

const Title = styled.h2`
  text-align: center;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 120px;
  height: 70vh;

  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  /* border: 1px solid ${({ theme }) => theme.text}; */
  border-radius: 5px;
  width: 350px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  padding: 10px;
  overflow-y: auto; /* Enable scrolling inside the modal if content overflows */
  border-radius: 8px;
  overflow-x: hidden; /* Enable scrolling inside the modal if content overflows */

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 10px; /* Width of the vertical scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.bgLighter}; /* Background of the scrollbar track */
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.text}; /* Color of the scrollbar thumb */
    border-radius: 8px;
    border: 3px solid ${({ theme }) => theme.bgLighter}; /* Space around the thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) =>
      theme.text}; /* Hover state for the scrollbar thumb */
  }
`;

const NotificationItem = styled.div`
  background-color: ${({ theme }) => theme.bg};
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const Notify = ({ setVideoCount, setNotificationOpen }) => {
  let i = 0;
  const [videos, setVideos] = useState([]);
  const [Notify, setNotify] = useState([]);
  const location=useLocation();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const notificationsResponse = await fetch("/notify/getNotifications");
        const notifications = await notificationsResponse.json();

        const videoIds = notifications.map(
          (notification) => notification.videoId._id
        );

        const NotifyIds = notifications.map(
          (notification) => notification._id
        );

        setNotify(NotifyIds);


        const videoDetailsPromises = videoIds.map(videoId =>
          axios.get(`/videos/find/${videoId}`)
        );
    
        const videoDetailsResponses = await Promise.all(videoDetailsPromises);
        const videoDetails = videoDetailsResponses.map(response => response.data);

        setVideos(videoDetails);
        // setVideoCount(videoDetails.length)
      } catch (e) {
        toast.error("No Notifications available");
      }
    };
    fetchVideos();
  }, [location]);


  const fetchVideos = async () => {
    try {
      const notificationsResponse = await fetch("/notify/getNotifications");
      const notifications = await notificationsResponse.json();

      const videoIds = notifications.map(
        (notification) => notification.videoId._id
      );

      const NotifyIds = notifications.map(
        (notification) => notification._id
      );

      setNotify(NotifyIds);

      console.log(videoIds);

      const videoDetailsPromises = videoIds.map(videoId =>
        axios.get(`/videos/find/${videoId}`)
      );
  
      const videoDetailsResponses = await Promise.all(videoDetailsPromises);
      const videoDetails = videoDetailsResponses.map(response => response.data);
      console.log(videoDetails);

      setVideos(videoDetails);
      // setVideoCount(videoDetails.length)
    } catch (e) {
      // toast.error("No Notifications available");
      console.log("No Notifications available");
    }
  };

  const removeVideo = (videoId) => {
    const updatedVideos = videos.filter((video) => video._id !== videoId);
    setVideos(updatedVideos);
    setVideoCount(updatedVideos.length);
  };

  return (
    <Container>
      <Wrapper>
        {/* {videos.map((userVideos, index) =>
          userVideos && userVideos.length > 0 ? (
            userVideos.map((video) => (
            //   <NotificationItem key={video._id}>
                <Notifycard key={video._id} video={video} />
            //    </NotificationItem> 
            ))
          ) : (
            // <NotificationItem key={index}>
            //   <p>No videos available</p>
            // </NotificationItem>
            <></>
          )
        )} */}

        {videos.length > 0 ? (
          videos.map((video) => (
            <Notifycard
              key={video._id}
              video={video}
              setVideoCount={setVideoCount}
              setNotificationOpen={setNotificationOpen}
              setNotify={setNotify}
              //   onClick={() => removeVideo(video._id)}
                onClick={() => fetchVideos()}
            />
          ))
        ) : (
          <Title>No Notification</Title>
        )}
      </Wrapper>
    </Container>
  );
};

export default Notify;
