import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import Loader from "../components/Loader";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: ${(props) => (props.menuOpen ? '290px' : '0px')}; 
  margin-top: 55px;

  transition: margin-left 0.3s ease;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center; 
    padding-right: 0; 
    margin-top: 40px;
  
  }
`;


const Home = ({type,menuOpen,toggleMenu}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    try{
    const fetchVideos = async () => {
      const res = await axios.get(`https://vidstream-mfy7.onrender.com/api/videos/${type}`,{
        withCredentials: true 
      });
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
    <Container menuOpen={menuOpen}>
      {videos.map((video) => (

        <Card key={video._id} video={video} menuOpen={menuOpen} toggleMenu={toggleMenu} />
      ))}
    </Container>
  );
};

export default Home;



