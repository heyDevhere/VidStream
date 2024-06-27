import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import Loader from "./Loader";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: ${(props) => (props.menuOpen ? '290px' : '0px')}; 
`;

const History = ({type,menuOpen}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try{
    const fetchVideos = async () => {
      const res = await axios.get(`https://vidstream-mfy7.onrender.com/api/users/watchLater/`,{
        withCredentials: true // Include credentials in axios
      });
      console.log(res.data);
      setVideos(res.data);
    };
    fetchVideos();
    }
    catch(err){

    }
    finally{
      setLoading(false);

    }
  }, [type]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container menuOpen={menuOpen} >
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  );
};

export default History;

