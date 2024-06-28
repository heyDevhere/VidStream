import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Box } from '@mui/material';
import styled from 'styled-components';

const Subscriptions = () => {
  const [subscribedUsers, setSubscribedUsers] = useState([]);
  const [subscribedUsersImage, setSubscribedUsersImage] = useState([]);

  useEffect(() => {
    const fetchSubscribedUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/users/subscribers',{
          withCredentials: true,
         }
        );
        console.log(response.data)
        setSubscribedUsers(response.data);

        const subscribedUserIds = response.data;


        const userDetailsPromises = subscribedUserIds.map(async (userId) => {
          const userResponse = await axios.get(`http://localhost:8800/api/users/find/${userId}`, {
            withCredentials: true,
          });
          return userResponse.data;
        });


        setSubscribedUsersImage(userDetailsPromises);
        console.log(userDetailsPromises)

      } catch (error) {
        console.error('Error fetching subscribed users:', error);
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

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

  return (
    <Box sx={{ borderRadius: 2,}}>
      <Items >
          Subscriptions
     </Items> 
      <List>
        {subscribedUsersImage.map((user) => (
          <ListItem key={user.id} sx={{ p: 0.5 }}>
            <ListItemAvatar>
              <Avatar alt={user.name} src={user.img} />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Subscriptions;
