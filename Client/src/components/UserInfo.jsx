import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";



const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin-bottom: 15px;

`;



const UserInfo = ({type}) => {
  const [videos, setVideos] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname.split("/")[3];
  const location=useLocation();

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`https://vidstream-mfy7.onrender.com/api/users/get/userInfo/${path}`,{
        withCredentials: true // Include credentials in axios
      });
      const res2 = await axios.get(`https://vidstream-mfy7.onrender.com/api/users/find/${path}`,{
        withCredentials: true // Include credentials in axios
      });
      setUserdata(res2.data);
      console.log(res2.data);
      setVideos(res.data);
    };
    fetchVideos();
  }, [location]);

  return (
    <>
      <Title>Videos uploaded by {userdata.name}</Title>
    <Container>
      {videos && videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
    </>
  );
};

export default UserInfo;


