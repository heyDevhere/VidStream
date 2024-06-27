import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "25px")};
  width: ${(props) => props.type !== "sm" && "350px"};
  margin-top: auto;
  cursor: pointer;
  margin-right:2px;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
      /* margin-bottom: ${(props) => (props.type === "sm" ? "2px" : "20px")}; */

  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
    min-width:310px;
    margin:auto;
    margin-left: -10px;
    margin-bottom: ${(props) => (props.type === "sm" ? "15px" : "20px")};

  }
`;

const Image = styled.img`
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
  object-fit: contain;
  /* width: 100%; */
  /* height: auto; */

  background-size: cover;
  border-radius: 3%;
  @media (max-width: 768px) {
    object-fit: cover;

      width: 100%;
      height: auto;

  }
 
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

const Texts = styled.div``;

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

const Parent = styled.div`

`;


const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Card = ({ type,video}) => {
  const [channel, setChannel] = useState({});
  const { currentUser } = useSelector((state) => state.user);


  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`https://vidstream-mfy7.onrender.com/api/users/find/${video.userId}`,{
        withCredentials: true // Include credentials in axios
      });
      setChannel(res.data);
     
    };
    fetchChannel();
  }, [video.userId]);

  const handleClick = async () => {
    scrollToTop();

    if(currentUser){
      try {
        const res = await axios.put(`https://vidstream-mfy7.onrender.com/api/users/${video._id}`, {}, {
          withCredentials: true // Include credentials in axios
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
    try {
      const res2 = await axios.put(`https://vidstream-mfy7.onrender.com/api/videos/view/${video._id}`, {}, {
        withCredentials: true // Include credentials in axios
      });
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }} onClick={handleClick} >
      <Parent>
    <Container type={type}>
      <Image
        type={type}
        src={video.imgUrl}
      />
      <Details type={type}>
        <ChannelImage
          type={type}
          src={channel.img}
        />
        <Texts>
        <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
        </Texts>
      </Details>
    </Container>
     </Parent>
  </Link>
  );
};

export default Card;


