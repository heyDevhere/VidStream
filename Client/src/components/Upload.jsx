import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchSuccess } from "../redux/videoSlice";


import app from "../firebase";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const Scrollbar = styled.div``;

const Wrapper = styled.div`
  width: 500px;
  /* height: 395px; */
  height: 80vh;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  overflow-y: auto; /* Enable scrolling inside the modal if content overflows */
  border-radius: 8px;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 10px; /* Width of the vertical scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.bgLighter}; /* Background of the scrollbar track */
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.text}; /* Color of the scrollbar thumb */
    border-radius: 8px;
    border: 3px solid ${({ theme }) => theme.bgLighter}; /* Space around the thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) =>
      theme.text}; /* Hover state for the scrollbar thumb */
  }
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 3999;
  margin: 5px;
  width: 100%; /* Ensure the textarea takes full width */
  box-sizing: border-box;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  margin: 3px;
  background-color: transparent;
  width: 100%; /* Ensure the textarea takes full width */
  box-sizing: border-box;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  width: 100%;
  margin: 5px 5px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
`;

const Utton = styled.button`
  border-radius: 3px;
  border: none;
  width: 100%;
  margin: 5px 5px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
`;


const Label = styled.label`
  font-size: 14px;
  margin: 15px 5px;
`;

const Upload = ({ setOpen,setNotificationOpen,setVideoCount }) => {
  const navigate = useNavigate();
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);

  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [tags, setTags] = useState([]);
  const [inputs, setInputs] = useState({});
  const defaultImgUrl =
    "https://videopromotion.club/assets/images/default-video-thumbnail.jpg";
  const dispatch=useDispatch();

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return {
              ...prev,
              [urlType]: downloadURL,
            };
          });
        });
      }
    );
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const  getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  margin: 15px 5px;
`;
  

  const handleUpload = async (e) => {

    try {
      e.preventDefault();
      if (video && inputs.title && inputs.desc && tags.length>0) {
    
  
        const res = await axios.post(`https://vid-stream-back.vercel.app/api/videos/`, { ...inputs, tags });
        if(res.data=="You are not authenticated!") toast.error("You are not authenticated! , login again!")
        setOpen(false);
        res.status === 200 && navigate(`/video/${res.data._id}`);
        toast.success("Video Uploaded Succesfully !");
        dispatch(fetchSuccess(res.data));
        // user ki uploaded videos ki rrey mai add kerke ke a liye api call

        const res2 = await axios.put(`https://vid-stream-back.vercel.app/api/users/userInfo/${res.data._id}`);
        // setNotificationOpen(true);
        // setVideoCount(prevCount => prevCount + 1); 


      } else {

        toast.error("Incomplete Information");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const tagOptions = [
    { value: "Music", label: "Music" },
    { value: "Sport", label: "Sport" },
    { value: "Game", label: "Game" },
    { value: "Movie", label: "Movie" },
    { value: "News", label: "News" },
  ];

  const handleTagsChange = (selectedOptions) => {
    setTags(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleimage = async (e) => {
    const selectedImg = e.target.files[0];
    setImg(selectedImg);
    
    try {
      const { width, height } = await getImageDimensions(selectedImg);
  
      const maxWidth = 358.6; // Example maximum width
      const maxHeight = 302; // Example maximum height
  
      if (width > maxWidth || height > maxHeight) {
        toast.error("Image dimensions exceed the allowed limit.");
        setOpen(false);
      } else {
        toast.success("Image dimensions are within the allowed limit.");
      }
    } catch (error) {
      console.error("Error getting image dimensions:", error);
      toast.error("Failed to get image dimensions.");
    }
  };
  
  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#333",
      borderColor: "#444",
      color: "#fff",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#333",
      color: "#fff",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#555",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#fff",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#555" : state.isFocused ? "#444" : "#333",
      color: "#fff",
    }),
  };

  

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Scrollbar>
          <Label>Video:</Label>
          {videoPerc > 0 ? (
            "Uploading:" + videoPerc + "%"
          ) : (
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          )}
          <Input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
          <Desc
            placeholder="Description"
            rows={8}
            name="desc"
            onChange={handleChange}
          />
          {/* <Input
            type="text"
            placeholder="Seperate the tags with commas."
            onChange={handleTags}
          /> */}
          <Button>
          <Select
            isMulti
            options={tagOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select Tags"
            onChange={handleTagsChange}
            // styles={customStyles} 
            />
          </Button>
          <Label>Image:</Label>
          <ChannelName>Max-Allowed : 358.6px x 302px</ChannelName>
          {imgPerc > 0 ? (
            "Uploading:" + imgPerc + "%"
          ) : (
            <Input
              type="file"
              accept="image/*"
              // onChange={(e) => setImg(e.target.files[0])}
              onChange={handleimage}
            />
          )}
          <Utton onClick={handleUpload}>Upload</Utton>
        </Scrollbar>
      </Wrapper>
    </Container>
  );
};

export default Upload;
