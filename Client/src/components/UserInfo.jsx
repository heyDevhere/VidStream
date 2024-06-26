import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: ${(props) => (props.menuOpen ? '290px' : '0px')}; 
  margin-top: 5px;
  @media (max-width: 768px) {
    margin-top: 50px;
  }

`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin-bottom: 15px;
  margin-left: ${({ menuOpen }) => (menuOpen ? '20px' : '0')}; /* Adjust margin-left conditionally */
  margin-top: 55px;
  @media (max-width: 768px) {
    margin-top: 50px;
  }

`;



const UserInfo = ({type,menuOpen,toggleMenu}) => {
  const [videos, setVideos] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname.split("/")[3];
  const location=useLocation();

  useEffect(() => {
    const fetchVideos = async () => {
      try{
      const res = await axios.get(`https://vidstream-mfy7.onrender.com/api/users/get/userInfo/${path}`,{
        withCredentials: true // Include credentials in axios
      });
      const res2 = await axios.get(`https://vidstream-mfy7.onrender.com/api/users/find/${path}`,{
        withCredentials: true // Include credentials in axios
      });
      setUserdata(res2.data);
      console.log(res2.data);
      setVideos(res.data);
      }
      catch(err){

      }
      finally {
        setLoading(false);
      }

    };
    fetchVideos();
  }, [location]);

  if (loading) {
    return <Loader />;
  }
  
  return (
    <>
      <Title menuOpen={menuOpen}>Videos uploaded by {userdata.name}</Title>
    <Container menuOpen={menuOpen}>
      {videos && videos.map((video) => (
        <Card key={video._id} video={video} menuOpen={menuOpen} toggleMenu={toggleMenu} />
      ))}
    </Container>
    </>
  );
};

export default UserInfo;


