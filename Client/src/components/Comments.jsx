import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import { toast } from "react-toastify";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;


const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  margin : 0px 2px;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const defaultImg = 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg';

  const [newCommentText, setNewCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const onDelete = (commentId) => {
    const updatedComments = comments.filter(comment => comment._id !== commentId);
    setComments(updatedComments);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://vidstream-mfy7.onrender.com/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const handleInputChange = (e) => {
    setNewCommentText(e.target.value);
  };

  const handleAddComment = async () => {
    if(currentUser){
    try {
      const res = await axios.post(`https://vidstream-mfy7.onrender.com/api/comments`, {
        desc: newCommentText,
        videoId: videoId,
      });
      const newComment = res.data;
      setComments([...comments, newComment]);
      toast.success("Comment Posted Successfully!")
      setNewCommentText("");
    } catch (err) {
      console.error(err);
    }
  }
  else{
    toast.error("Login First!");
  }
  };


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://vidstream-mfy7.onrender.com/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  //   //TODO: ADD NEW COMMENT FUNCTIONALITY
  const imgUrl = currentUser?.img || defaultImg;

  return (
    <Container>
      <NewComment>
        <Avatar src={imgUrl} />
        <Input
          placeholder="Add a comment..."
          value={newCommentText}
          onChange={handleInputChange}
        />
        <Button onClick={handleAddComment}>POST</Button>{" "}
        {/* Button to add comment */}
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} onDelete={onDelete}/>
      ))}
    </Container>
  );
};

export default Comments;

