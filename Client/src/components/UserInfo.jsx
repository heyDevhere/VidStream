import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { useSelector } from "react-redux";


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin-bottom: 15px;

`;

const UserInfo = ({type}) => {
  const [videos, setVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/users/userInfo/`);
      setVideos(res.data);
    };
    fetchVideos();
  }, []);

  return (
    <>
      <Title>Videos uploaded by {currentUser.name}</Title>
    <Container>
      {videos && videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
    </>
  );
};

export default UserInfo;