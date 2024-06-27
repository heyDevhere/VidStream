import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import Loader from "./Loader";

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags , excludeId}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try{
      const res = await axios.get(`https://vidstream-mfy7.onrender.com/api/videos/tags?tags=${tags}`, {
        withCredentials: true // Include credentials in axios
      });
      const filteredVideos = res.data.filter(video => video._id !== excludeId);
      setVideos(filteredVideos);
      }
      catch (err) {}
      finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [tags,excludeId]);

  if (loading) {
    return <Loader />;
  }


  return (
    <Container>
      {videos && videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;


