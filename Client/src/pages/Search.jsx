import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import Loader from "../components/Loader";

const Container = styled.div`
  
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: ${(props) => (props.menuOpen ? '290px' : '0px')}; 

`;

const Search = ({menuOpen}) => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchVideos = async () => {
      try{
      const res = await axios.get(`https://vidstream-mfy7.onrender.com/api/videos/search${query}`,{
        withCredentials: true // Include credentials in axios
      });
      setVideos(res.data);
      }
      catch(error){

      }
      finally{
        setLoading(false);
      }
    };
    fetchVideos();
  }, [query]);

  if (loading) {
    return <Loader />;
  }

  return <Container menuOpen={menuOpen}>
    {videos.map(video=>(
      <Card key={video._id} video={video}/>
    ))}
  </Container>;
};

export default Search;

