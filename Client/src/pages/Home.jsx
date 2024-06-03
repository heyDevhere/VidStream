import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const flattenData = (data) => {
  const result = [];
  
  const flatten = (item) => {
    if (Array.isArray(item)) {
      item.forEach(flatten);
    } else if (item && typeof item === 'object') {
      result.push(item);
    }
  };

  flatten(data);
  return result;
};

const Home = ({type}) => {
  const [videos, setVideos] = useState([]);

  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     const res = await axios.get(`/videos/${type}`);
  //     console.log(res.data);
  //     setVideos(res.data);
  //   };
  //   fetchVideos();
  // }, [type]);


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/videos/${type}`);
        console.log('API Response:', res.data); // Log the response data to check its structure

        if (Array.isArray(res.data) || (res.data && typeof res.data === 'object')) {
          const flattenedData = flattenData(res.data);
          setVideos(flattenedData);
        } else {
          console.error("Response is not an array or object", res.data);
          setVideos([]);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      }
    };
    fetchVideos();
  }, [type]);


  return (
    <Container>
      {/* {videos.map((video) => (

        <Card key={video._id} video={video}/>
      ))} */}
    </Container>
  );
};

export default Home;