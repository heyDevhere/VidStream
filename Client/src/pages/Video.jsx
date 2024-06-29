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
  margin-top: 55px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 40px;
  }
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
  @media (max-width: 768px) {
    margin-top: 22px;
  }
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 15px;
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
  cursor: pointer;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
  cursor: pointer;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  margin-top: 5px;
  display: -webkit-box;
  -webkit-line-clamp: ${({ expanded }) => (expanded ? "none" : "2")};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
`;

const SeeMoreButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
  text-align: right;
  /* text-align: right; */

  positon: absolute;
  @media (max-width: 768px) {
  }
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

const VideoFrame = styled.video`
  height: 70vh;
  width: 100%;
  object-fit: cover;
  z-index: 100;
  position: sticky;
  top: 0;
  border-radius: 12px;
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
  @media (max-width: 768px) {
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

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [showVideo, setShowVideo] = useState(true); // State to control video visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTrack, setSelectedTrack] = useState(null);
  const videoRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isExpanded, setIsExpanded] = useState();
  // const [isExpanded, setIsExpanded] = useState();

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const [channel, setChannel] = useState({});
  const [video, setVideo] = useState([]);

  const path = useLocation().pathname.split("/")[2];

  const handleWatchLater = async () => {
    if (currentUser) {
      try {
        const res = await axios.put(
          `https://vidstream-mfy7.onrender.com/api/users/updatewatch/${path}`,
          {},
          {
            withCredentials: true, // Include credentials in axios
          }
        );
        toast.success("Video Successfully added in Watch Later Section");
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
        const videoRes = await axios.get(
          `https://vidstream-mfy7.onrender.com/api/videos/find/${path}`,
          {
            withCredentials: true, // Include credentials in axios
          }
        );
        const channelRes = await axios.get(
          `https://vidstream-mfy7.onrender.com/api/users/find/${videoRes.data.userId}`,
          {
            withCredentials: true, // Include credentials in axios
          }
        );
        console.log(videoRes.data);
        dispatch(fetchSuccess(videoRes.data));
        setVideo(videoRes.data);

        setChannel(channelRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const userInfo = () => {
    scrollToTop();
    navigate(`/currentVideo/userInfo/${channel._id}`);
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

  const handleSub = async () => {
    if (currentUser) {
      try {
        let updatedSubscribers = channel?.subscribers ?? 0;

        if (currentUser.subscribedUsers.includes(channel._id)) {
          await axios.put(
            `https://vidstream-mfy7.onrender.com/api/users/unsub/${channel._id}`,
            {},
            {
              withCredentials: true, // Include credentials in axios
            }
          );
          updatedSubscribers -= 1;
        } else {
          await axios.put(
            `https://vidstream-mfy7.onrender.com/api/users/sub/${channel._id}`,
            {},
            {
              withCredentials: true, // Include credentials in axios
            }
          );
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

  const handleLike = async () => {
    await axios.put(
      `https://vidstream-mfy7.onrender.com/api/users/like/${currentVideo._id}`,
      {},
      {
        withCredentials: true, // Include credentials in axios
      }
    );

    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    await axios.put(
      `https://vidstream-mfy7.onrender.com/api/users/dislike/${currentVideo._id}`,
      {},
      {
        withCredentials: true, // Include credentials in axios
      }
    );

    dispatch(dislike(currentUser._id));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={video.videoUrl} controls />
        </VideoWrapper>
        <Title>{video.title}</Title>
        <Details>
          <Info>
            {video.views} views • {format(video.createdAt)}
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
              <ChannelName onClick={userInfo}>{channel.name}</ChannelName>
              <ChannelCounter onClick={userInfo}>
                {channel.subscribers} subscribers
              </ChannelCounter>
              {/* <Description>{video.desc}</Description> */}
              <Description expanded={isExpanded}>{video.desc}</Description>
              {video.desc?.length > 100 && ( // Assuming 100 characters is a rough estimate for 3 lines
                <SeeMoreButton onClick={toggleDescription}>
                  {isExpanded ? "Show Less" : "Show More"}
                </SeeMoreButton>
              )}
            </ChannelDetail>
          </ChannelInfo>

          <Subscribe onClick={handleSub}>
            {currentUser?.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={video._id} />
      </Content>
      <Recommendation tags={video.tags} excludeId={video._id} />
    </Container>
  );
};

export default Video;
