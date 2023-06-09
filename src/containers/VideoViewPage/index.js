/**
 *
 * VideoViewPage
 *
 */

import { Button } from "@mui/material";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingWithText from "../../components/LoadingWithText";
import VideoPlayer from "../../components/VideoPlayer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MailLayout from "../../layouts/MainLayout";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import RelatedVideos from "./RelatedVideos/RelatedVideos";
import { VideoViewContentWrapper } from "./styles";
import VideoComments from "./VideoComments/VideoComments";
import VideoInfo from "./VideoInfo/VideoInfo";
import VideoPlayList from "./VideoPlayList/VideoPlayList";

import VideoViewService from "../../services/GetVideoViewApi/GetVideoViewApi";
import { ROUTE_LOGIN } from "../../routes";

// TODO این  صفحه هنوز انجام نشده
export function VideoViewPage({}) {
  const { slug } = useParams();
  const VideoViewApi = VideoViewService();

  const [loading, setLoading] = useState(true);
  const [videoComment, setVideoComment] = useState(null);

  const [videoData, setVideoData] = useState(null);
  const [errorVideoData, setErrorVideoData] = useState(null);

  const [newAnswer, setNewAnswer] = useState("");
  const [newLike, setNewLike] = useState("");
  const [newDisLike, setNewDisLike] = useState("");

  const [removeComment, setRemoveComment] = useState("");
  const navigate=useNavigate();

  const currentPlaylist = new URLSearchParams(window.location.search).get(
    "playlist"
  );

  async function handleGetVideo() {
    try {
      const response = await VideoViewApi.GetVideoView(`/video/${slug}`);
      if (response.error) {
        console.log(response.error);
        setErrorVideoData(response.error);
      } else {
        console.log(response.result);
        setVideoData(response.result);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  const handlePostNewAnswer = (newComment) => {
      setNewAnswer(newComment);
  };

  const handleLike = (like) => {
    setNewLike(like);
};

const handleDisLike = (dislike) => {
  setNewDisLike(dislike);
};



  useEffect(() => {
    handleGetVideo();
  }, [slug, videoComment, newAnswer,newDisLike,newLike]);

  return (
    <MailLayout fullWidth drawerIsOpen={false}>
      <Helmet>
        <title>VideoViewPage</title>
        <meta name="description" content="Description of VideoViewPage" />
      </Helmet>

      {loading && <LoadingWithText text="در حال دریافت اطلاعات ویدیو" />}

      {errorVideoData && (
        <ErrorMessage
          error={errorVideoData}
          options={{
            404: "ویدیو مورد نظر یافت نشد",
            default: (
              <div>
                در دریافت اطلاعات ویدیو مشکلی به وجود آمده است
                <Button onClick={handleGetVideo}>بارگذاری مجدد</Button>
              </div>
            ),
          }}
        />
      )}

      {videoData && (
        <VideoViewContentWrapper>
          {!!(videoData.related_videos && videoData.related_videos.length) && (
            <div className="sidebar" width="100%" height="300">
              {(currentPlaylist ||
                videoData.playlist) && (
                  <VideoPlayList
                    playlistId={
                      currentPlaylist ? currentPlaylist : videoData.playlist.id
                    }
                    currentVideoId={videoData.id}
                  />
                )}
              <RelatedVideos videos={videoData.related_videos} />
            </div>
          )}

          <div className="content">
            <VideoPlayer video={videoData} />

            <VideoInfo video={videoData} onLike={handleLike} onDisLike={handleDisLike} />

            <VideoComments
              video={videoData}
              onCommentChange={(change) => {
                setVideoComment(change);
              }}
              onPostNewAnswer={handlePostNewAnswer}
            />
          </div>
        </VideoViewContentWrapper>
      )}
    </MailLayout>
  );
}

VideoViewPage.propTypes = {
  // match: PropTypes.object.isRequired,
  // location: PropTypes.object.isRequired,
  // videoData: PropTypes.object.isRequired,
  // handleGetVideo: PropTypes.func.isRequired,
};

export default VideoViewPage;
