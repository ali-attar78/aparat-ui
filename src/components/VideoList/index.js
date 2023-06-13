/**
 *
 * VideoList
 *
 */

import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import getListVideos from "../../services/GetVideoApi/GetVideoListApi";

import VideoItem from "../VideoItem";
import NoItemInList from "../NoItemInList";
import { VIDEO_STATE_BLOCKED } from "../../constans";

const VideoListWrapper = styled(Grid)`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`;

function VideoList({ filterValue }) {
  const [videoList, setVideoList] = useState([]);
  const [doDelete, setDoDelete] = useState([]);

  const getVideoList = getListVideos();
  console.log(filterValue);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await getVideoList.getVideoList("/video");
        console.log(response.result.data);
        switch (filterValue) {
          case "unpublished":
            console.log(
              response.result.data.filter(
                (video) => video.state === VIDEO_STATE_BLOCKED
              )
            );
            setVideoList(
              response.result.data.filter(
                (video) => video.state === VIDEO_STATE_BLOCKED
              )
            );
            break;
          case "playlist":
            setVideoList(
              response.result.data.filter(
                (video) => video.playlist && video.playlist.length
              )
            );
            break;

          case "republish":
            setVideoList(response.result.data.filter((video) => video.republished));
            break;

          default:
            setVideoList(response.result.data);
            break;
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchVideos();
  }, [filterValue, doDelete]);

  const handleDeleteItem = (deleteItem) => {
    setDoDelete(deleteItem);
  };

  return (
    <VideoListWrapper>
      {!!videoList &&
        !!videoList.length &&
        videoList.map((video) => (
          <VideoItem key={video.id} video={video} onDelete={handleDeleteItem} />
        ))}

      {!(videoList && videoList.length) && (
        <NoItemInList title="هیچ موردی یافت نشد" />
      )}
    </VideoListWrapper>
  );
}

export default memo(VideoList);
