import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "350px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  margin-right: 2px;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
  flex-direction: row;
`;

const Image = styled.img`
  height: ${(props) => (props.type === "sm" ? "20px" : "50px")};
  width: ${(props) => (props.type === "sm" ? "20px" : "50px")};
  background-color: #999;
  margin:5px 2px;
/* 
  object-fit: contain;
  background-size: cover; */
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;

`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Notifycard = ({
  type,
  video,
  setVideoCount,
  setNotificationOpen,
  fetchVideos,
}) => {
  const [channel, setChannel] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  const handleClick = async () => {
    if (currentUser) {
      try {
        scrollToTop();
        const res = await axios.put(`/users/${video._id}`);
        setVideoCount((prevCount) => prevCount - 1);
        const res2 = await axios.delete(`/notify/delete/${video._id}`);

        setNotificationOpen(false);
        // fetchVideos()
        Navigate(`/video/${video._id}`);
      } catch (error) {
        // toast.error("Error");
        console.log(error);
      }
    }
  };

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }} onClick={handleClick}>
      <Container type={type}>
        <Details type={type}>
          <ChannelImage type={type} src={channel.img} />
          <Texts>
            <div>
              <Title>
                {channel.name} uploaded: {video.title}
              </Title>
              <ChannelName>{channel.name}</ChannelName>
              <Info>
                {video.views} views • {format(video.createdAt)}
              </Info>
            </div>
            <Image type={type} src={video.imgUrl} />
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Notifycard;
