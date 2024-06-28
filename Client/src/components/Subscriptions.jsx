import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Box } from "@mui/material";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";

const Subscriptions = () => {
  const [subscribedUsers, setSubscribedUsers] = useState([]);
  const [subscribedUsersImage, setSubscribedUsersImage] = useState([]);

  useEffect(() => {
    const fetchSubscribedUsers = async () => {
      try {
        const response = await axios.get(
          "https://vidstream-mfy7.onrender.com/api/users/subscribers",
          {
            withCredentials: true,
          }
        );
        const subscribedUserIds = response.data;

        const userDetailsPromises = subscribedUserIds.map(async (userId) => {
          const userResponse = await axios.get(
            `https://vidstream-mfy7.onrender.com/api/users/find/${userId}`,
            {
              withCredentials: true,
            }
          );
          return userResponse.data;
        });

        const userDetails = await Promise.all(userDetailsPromises);
        setSubscribedUsersImage(userDetails);
      } catch (error) {
        console.error("Error fetching subscribed users:", error);
      }
    };

    fetchSubscribedUsers();
  }, []);

  const Items = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 7.5px 0px;
    font-size: large;
    font-weight: bold;
    margin-top: 24px;
    color: ${({ theme }) => theme.text};
    &:hover {
      background-color: ${({ theme }) => theme.bgLighter};
    }
  `;


  const Container = styled.div`
    margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "25px")};
    width: 100%;
    max-width: 350px;
    margin-top: auto;
    cursor: pointer;
    padding-right: 10px;
    display: ${(props) => props.type === "sm" && "flex"};
    gap: 10px;
    /* margin-bottom: ${(props) => (props.type === "sm" ? "2px" : "20px")}; */

    flex-direction: column;
    /* @media (max-width: 768px) {
    width: 100%;
    min-width:310px;
    margin:auto;
    margin-left: -10px;
    margin-bottom: ${(props) => (props.type === "sm" ? "15px" : "20px")};

  } */
  `;

  const Details = styled.div`
    display: flex;
    margin-top: ${(props) => props.type !== "sm" && "16px"};
    gap: 12px;
    align-items: center; /* Align items vertically in the center */
    flex: 1;
    box-sizing: border-box; /* Include padding and border in element's total width */
    padding: 5px; /* Add padding for better spacing */
    border-radius: 8px; /* Add border radius for rounded corners */


    &:hover {
      background-color: ${({ theme }) => theme.soft};
      cursor: pointer;
      margin-right: auto;
    }
  `;

  const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    display: ${(props) => props.type === "sm" && "none"};
  `;

  const Texts = styled.div``;

  const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({ theme }) => theme.text};
    margin: 9px 0px;
  `;

  return (
    <Container>
      <Items>Subscriptions</Items>

      {subscribedUsersImage.map((user) => (
        <Link to={`/video/userInfo/${user._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
        >
          <Details key={user._id}>
            <ChannelImage src={user.img} />
            <Texts>
              <ChannelName>{user.name}</ChannelName>
            </Texts>
          </Details>
        </Link>
      ))}
    </Container>
  );
};

export default Subscriptions;
