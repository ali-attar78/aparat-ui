import { Button } from "@mui/material";
import {
  AddOutlined as FollowIcon,
  Favorite as LikeIcon,
  FavoriteBorder as LikeEmptyIcon,
  GetApp as DownloadIcon,
  QueryBuilderOutlined,
  RepeatOutlined as RepublishIcon,
  ShareOutlined as ShareIcon,
  VisibilityOutlined as ViewsIcon,
  PlaylistPlayOutlined,
  Public,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import LikeOrDislikeService from "../../../services/LikeOrDislikeVideoApi/LikeOrDislikeVideoApi";
import RepublishVideoService from "../../../services/RepublishVideoApi/RepublishVideoApi";
import FollowService from "../../../services/FollowApi/FollowApi";
import UnFollowService from "../../../services/UnFollowApi/UnFollowApi";

import PropTypes from "prop-types";
import React, { memo, useEffect, useState } from "react";

import { getAge } from "../../../utils/helpers";
import { ROUTE_HOME, ROUTE_MY_CHANNEL, ROUTE_LOGIN } from "../../../routes";
import ShareVideoModal from "../ShareVideoModal/ShareVideoModal";
import {
  ButtonsWrapper,
  ChannelInfoWrapper,
  VideoInfoWrapper,
  LinkButton,
} from "../styles";

function VideoInfo({ video, onLike, onDisLike }) {
  const authLogin = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;
  const isMe = authLogin ? authLogin.user.id === video.user_id : false;

  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const [isFollowed, setIsFollowed] = useState(video.channel.is_followed);
  const LikeOrDislikeApi = LikeOrDislikeService();
  const RepublishVideoApi = RepublishVideoService();
  const UnFollowApi = UnFollowService();
  const FollowApi = FollowService();

  const [doLike, setDoLike] = useState(null);
  const [errorDoLike, setErrorDoLike] = useState(null);

  const [doUnLike, setDoUnLike] = useState(null);
  const [errorDoUnLike, setErrorDoUnLike] = useState(null);

  const [republished, setRepublished] = useState(null);
  const [errorRepublished, setErrorRepublished] = useState(null);

  const [follow, setFollow] = useState(null);
  const [errorFollow, setErrorFollow] = useState(null);

  const [unFollow, setUnFollow] = useState(null);
  const [errorUnFollow, setErrorUnFollow] = useState(null);

  async function handleLikeAndDislike() {
    try {
      if (!video.liked) {
        const response = await LikeOrDislikeApi.LikeOrDislikeVideo(
          `/video/${video.slug}/like`
        );

        if (response.error) {
          console.log(response.error);
          setErrorDoLike(response.error);
        } else {
          console.log(response.result);
          setDoLike(response.result);
          onLike(response.result);
          video.liked = 1;
        }
      } else {
        const response = await LikeOrDislikeApi.LikeOrDislikeVideo(
          `/video/${video.slug}/unlike`
        );

        if (response.error) {
          console.log(response.error);
          setErrorDoUnLike(response.error);
        } else {
          console.log(response.result);
          setDoUnLike(response.result);
          onDisLike(response.result);
          video.liked = 0;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRepulishVideo() {
    try {
      const response = await RepublishVideoApi.RepublishVideo(
        `/video/${video.slug}/republish`
      );
      if (response.error) {
        console.log(response.error);
        setErrorRepublished(response.error);
      } else {
        console.log(response.result);
        setRepublished(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleFollowOrUnfollow() {
    try {
      if (!isFollowed) {
        console.log("follow");
        const response = await FollowApi.doFollow(
          `/user/${video.channel.name}/follow`
        );

        if (response.error) {
          console.log(response.error);
          setErrorFollow(response.error);
        } else {
          console.log(response.result);
          setFollow(response.result);
          setIsFollowed(true);
        }
      } else {
        const response = await UnFollowApi.doUnFollow(
          `/user/${video.channel.name}/unfollow`
        );
        console.log("unfollow");

        if (response.error) {
          console.log(response.error);
          setErrorUnFollow(response.error);
        } else {
          console.log(response.result);
          setUnFollow(response.result);
          setIsFollowed(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleNOLogin() {
    navigate(ROUTE_LOGIN);
  }

  function toggleShareModal() {
    setShowShareModal(!showShareModal);
  }

  return (
    <VideoInfoWrapper>
      <div className="Row">
        <h1 className="title">{video.title}</h1>
        <span className="views">
          <ViewsIcon className="icon" /> {video.views}
        </span>
      </div>

      <div className="Row">
        <ChannelInfoWrapper
          onClick={() =>
            navigate(ROUTE_MY_CHANNEL.replace(":name", video.channel.name))
          }
        >
          <img src={video.channel.banner} alt={video.title} />

          <div>
            <h4>{video.channel.name}</h4>
            <span>{video.channel.followers_count} دنبال کننده</span>
          </div>
        </ChannelInfoWrapper>

        <ButtonsWrapper>
          <Button onClick={handleLikeAndDislike}>
            {video.liked ? (
              <LikeIcon style={{ color: "#df0f50" }} />
            ) : (
              <LikeEmptyIcon />
            )}

            {video.likeCount}
          </Button>

          <a
            className="MuiButtonBase-root"
            href={video.link}
            download
            target="_blank"
            rel="noreferrer"
          >
            <DownloadIcon />
            <span className="desc">دانلود</span>
          </a>

          <Button onClick={toggleShareModal}>
            <ShareIcon />
            <span className="desc">اشتراک گذاری</span>
          </Button>
          {showShareModal && (
            <ShareVideoModal
              url={window.location.href}
              onClose={toggleShareModal}
            />
          )}

          <Button
            onClick={!!authLogin && !isMe ? handleRepulishVideo : handleNOLogin}
            disabled={isMe}
          >
            <RepublishIcon />
            <span className="desc">بازنشر</span>
          </Button>

          <Button
            className={`btn btn-follow ${
              isFollowed ? "followed" : "unfollowed"
            }`}
            onClick={!!authLogin ? handleFollowOrUnfollow : handleNOLogin}
            disabled={isMe}
          >
            <FollowIcon />
            {isFollowed ? "دنبال شده" : "دنبال کردن"}
          </Button>
        </ButtonsWrapper>
      </div>

      <div className="extraInfo">
        <div className="videoDescribtion">{video.info}</div>

        <div className="videoTimeAndTags">
          <LinkButton>
            <QueryBuilderOutlined style={{ fontSize: "1em" }} />
            {getAge(video.age)}
          </LinkButton>
          <LinkButton
            onClick={() =>
              navigate(`${ROUTE_HOME}?playlist=${video.playlist.id}`)
            }
          >
            <PlaylistPlayOutlined />
            {video.playlist ? video.playlist.title : "لیست پخش وجود ندارد"}
          </LinkButton>
          {console.log(video.tags)};
          {video.tags.map((tag) => (
            <LinkButton
              key={tag.id}
              className="tag"
              onClick={() => navigate(`${ROUTE_HOME}?tag=${tag.id}`)}
            >
              <i style={{ fontSize: "1.2em" }}>#</i>
              {tag.title}
            </LinkButton>
          ))}
        </div>
      </div>
    </VideoInfoWrapper>
  );
}

VideoInfo.propTypes = {
  video: PropTypes.object.isRequired,
};

export default memo(VideoInfo);
