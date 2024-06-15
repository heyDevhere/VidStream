// import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { format } from "timeago.js";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"; // Import the delete icon
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
  position: relative;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px 15px;
  color: #3ea6ff;
  margin: 0px 2px;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  position: absolute; /* Set position absolute */
  right: 1px; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Comment = ({ comment,userId,onDelete }) => {
  const [channel, setChannel] = useState({});


  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`https://vidstream-mfy7.onrender.com/api/users/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId]);

  const handleDelete = async () => {
    try {
      const res=await axios.delete(`https://vidstream-mfy7.onrender.com/api/comments/${comment._id}`); // Call the delete API
      toast.success("Comment Deleted Successfully!")
      onDelete(comment._id); // Call the callback function to update UI

    } catch (error) {
      toast.error("You can only delete your comment!");
      console.log("Error deleting comment:", error);
    }
  };

  return (
    <Container>
      <Avatar src={channel.img} />

      <Details>
        <Name>
          {channel.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>{comment.desc}</Text>
        <Button onClick={handleDelete}>
          <DeleteOutlineIcon/>
        </Button>
      </Details>
    </Container>
  );
};

export default Comment;


