import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const MyTags = ({ type}) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`https://vid-stream-frontend.vercel.app/api/videos/tags?tags=${type}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((video) => (
        <Card  key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default MyTags;