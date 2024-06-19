import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;



  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`https://vidstream-mfy7.onrender.com/api/videos/search${query}`,{
        withCredentials: true // Include credentials in axios
      });
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return <Container>
    {videos.map(video=>(
      <Card key={video._id} video={video}/>
    ))}
  </Container>;
};

export default Search;

