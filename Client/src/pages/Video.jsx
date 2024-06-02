import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchSuccess } from "../redux/videoSlice";
import { format } from "timeago.js";
import { like, dislike } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import Recommendation from "../components/Recommendation";
import { toast } from "react-toastify";
import { useRef } from "react";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTrack, setSelectedTrack] = useState(null);
  const videoRef = useRef(null);

  const [channel, setChannel] = useState({});

  const path = useLocation().pathname.split("/")[2];

  const handleWatchLater = async () => {
    if (currentUser) {
      try {
        const res = await axios.put(`/users/updatewatch/${path}`);
        console.log("Video added to watch later");
        console.log(res.data);
        toast.success("Video Successfully added to watch later");
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      toast.error("Login First!");
    }
  };

  const handleNotify = async () => {
    if (!currentUser) toast.error("Login First!");
    if (currentUser.subscribedUsers?.includes(channel._id)) {
      try {
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      toast.error("Subscribe to get Notified!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        dispatch(fetchSuccess(videoRes.data));
        setChannel(channelRes.data);
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    if (currentUser) {
      await axios.put(`/users/like/${currentVideo._id}`);
      if (currentUser._id) {
        dispatch(like(currentUser._id));
      }
    } else {
      toast.error("login to like the video");
    }
  };

  const userInfo = () => {
    navigate("/video/userInfo");
  };

  const handleShare = () => {
    const videoUrl = window.location.href;
    navigator.clipboard
      .writeText(videoUrl)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const VideoFrame = styled.video`
    height: 70vh;
    width: 100%;
    object-fit: cover;
    z-index: 100;
    position: sticky;
    top: 0;
  `;

  const WatchButton = styled.div`
    position: relative;
    cursor: pointer;

    &:hover::after {
      content: "Watch Later";
      position: absolute;
      top: -80%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      font-size: 14px;
      white-space: nowrap;
    }
  `;

  const NButton = styled.div`
    position: relative;
    cursor: pointer;

    &:hover::after {
      content: "Notify";
      position: absolute;
      top: -80%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      font-size: 14px;
      white-space: nowrap;
    }
  `;

  const DButton = styled.div`
    position: relative;
    cursor: pointer;

    &:hover::after {
      content: "Download";
      position: absolute;
      top: -80%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      font-size: 14px;
      white-space: nowrap;
    }
  `;

  const LikeButton = styled.div`
    position: relative;
    cursor: pointer;

    &:hover::after {
      content: "Like";
      position: absolute;
      top: -80%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      font-size: 14px;
      white-space: nowrap;
    }
  `;

  const DislikeButton = styled.div`
    position: relative;
    cursor: pointer;

    &:hover::after {
      content: "Dislike";
      position: absolute;
      top: -80%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      font-size: 14px;
      white-space: nowrap;
    }
  `;

  const SButton = styled.div`
    position: relative;
    cursor: pointer;

    &:hover::after {
      content: "Share";
      position: absolute;
      top: -80%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      font-size: 14px;
      white-space: nowrap;
    }
  `;

  const handleDislike = async () => {
    if (currentUser) {
      await axios.put(`/users/dislike/${currentVideo._id}`);
      if (currentUser._id) {
        dispatch(dislike(currentUser._id));
      }
    } else {
      toast.error("login to dislike the video");
    }
  };

  const handleSub = async () => {
    if (currentUser) {
      try {
        let updatedSubscribers = channel?.subscribers ?? 0;

        if (currentUser.subscribedUsers.includes(channel._id)) {
          await axios.put(`/users/unsub/${channel._id}`);
          updatedSubscribers -= 1;
        } else {
          await axios.put(`/users/sub/${channel._id}`);
          updatedSubscribers += 1;
        }

        setChannel((prev) => ({
          ...prev,
          subscribers: updatedSubscribers,
        }));

        dispatch(subscription(channel._id));
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.error("Login First!");
    }
  };

  const handleTrackChange = (trackIndex) => {
    const tracks = videoRef.current?.audioTracks;
    if (tracks && tracks.length > trackIndex) {
      setSelectedTrack(tracks[trackIndex]);
    }
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame
            src={currentVideo.videoUrl}
            controls
            
          />

          {/* {videoRef.current?.audioTracks &&
            videoRef.current.audioTracks.length > 1 && (
              <div>
                {videoRef.current.audioTracks.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => handleTrackChange(index)}
                    disabled={selectedTrack === track}
                  >
                    {track.label}
                  </button>
                ))}
              </div>
            )} */}
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>
            {currentVideo.views} views • {format(currentVideo.createdAt)}
          </Info>
          <Buttons>
            <LikeButton>
              <Button onClick={handleLike}>
                {currentVideo.likes?.includes(currentUser?._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
                )}{" "}
                {currentVideo.likes?.length}
              </Button>
            </LikeButton>

            <DislikeButton>
              <Button onClick={handleDislike}>
                {currentVideo.dislikes?.includes(currentUser?._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOffAltOutlinedIcon />
                )}{" "}
                {currentVideo.dislikes?.length}
              </Button>
            </DislikeButton>
            <Button>
              <SButton onClick={handleShare}>
                <ShareOutlinedIcon />
              </SButton>
            </Button>

            <Button>
              <WatchButton onClick={handleWatchLater}>
                <WatchLaterOutlinedIcon />
              </WatchButton>
            </Button>

            <Button>
              <NButton onClick={handleNotify}>
                {currentUser?.subscribedUsers?.includes(channel._id) ? (
                  <NotificationsActiveIcon />
                ) : (
                  <NotificationsIcon />
                )}
              </NButton>
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} onClick={userInfo} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>

          <Subscribe onClick={handleSub}>
            {currentUser?.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendation tags={currentVideo.tags} excludeId={currentVideo._id} />
    </Container>
  );
};

export default Video;
