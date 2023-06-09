/**
 *
 * VideoItem
 *
 */

import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/EditOutlined";
import StatisticsIcon from "@mui/icons-material/BarChartOutlined";
import DeleteVideoItemService from "../../services/DeleteVideoItemApi/DeleteVideoItemApi";
import Confirm from "../../components/Confirm";
import styled from "styled-components";
import { Grid } from "@mui/material";

import { converSecondToTime } from "../../utils/helpers";
import {
  VIDEO_STATE_PENDING,
  VIDEO_STATE_PENDING_TITLE,
  VIDEO_STATE_CONVERTED,
  VIDEO_STATE_CONVERTED_TITLE,
  VIDEO_STATE_BLOCKED,
  VIDEO_STATE_BLOCKED_TITLE,
} from "../../constans";

const VideoItemWrapper = styled.div`
  display: flex !important;
  flex-direction: column;
  justify-content: space-between !important;
  background: #fff;

  width: 180px;
  height: 220px;
  box-shadow: 0 0px 2px 0px #e8e8e8;
  position: relative;

  .duration {
    background: #f9b03a;
    border: 1px solid #c78d36;
    padding: 4px 2px;
    margin: 0;
    width: auto;
    position: absolute;
    left: 0.6em;
    top: 33%;
    line-height: 1em;
    min-width: 32px;
    border-radius: 2px;
    text-align: center;
    font-size: 0.8em;
    opacity: 0.8;
  }

  .tag {
    background: #ddeefe;
    color: #4e90ba;
    position: absolute;
    right: 0.6em;
    top: 33%;
    padding: 3px 7px;
    font-size: 0.6em;
    font-weight: bold;
    border-radius: 5px;
    opacity: 0.8;
  }

  img {
    height: 45%;
    width: 100%;
    border-bottom: 1px solid #eee;
  }

  .content {
    padding: 0.5em;
    position: relative;

    .title {
      font-size: 1em;
      font-wigth: 600;
      padding: 0;
      margin: 0;
    }

    .views {
      padding: 0;
      margin: 0.2em 0;
      font-size: 0.8em;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    padding: 0.4em;

    .button {
      padding: 0;
      margin: 0;
      min-width: auto;
      transition: 200ms ease;
      cursor: pointer;

      :hover {
        color: red;
        transform: scale(1.3);
      }
    }
  }

  .errorBox {
    background: #ff5c5c;
    color: #fff;
    padding: 0.5em;
    font-size: 0.7em;
    text-align: right;
    position: absolute;
    bottom: 0;
    width: 100%;
    cursor: pointer;

    span {
      color: #edff1c;
      position: absolute;
      left: 0.5em;
      top: 0.2em;
      font-size: 1.2em;
      padding: 2px;

      :hover {
        color: #fff;
      }
    }
  }
`;

function VideoItem({ video, onDelete }) {
  const deleteVideoItem = DeleteVideoItemService();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  function removeDeleteError() {
    setIsError(false);
  }

  async function deleteThisItem() {
    try {
      const response = await deleteVideoItem.deleteVideoItem(
        `/video/${video.slug}`
      );
      onDelete(response);
      setShowDeleteModal(false);
      console.log(response);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  }

  return (
    <VideoItemWrapper>
      <img src={video.banner_link} alt={video.title} />
      <b className="duration">{converSecondToTime(video.duration)}</b>

      {!!video.republished && <span className="tag">بازنشر</span>}

      {video.state === VIDEO_STATE_PENDING && (
        <span className="tag">{VIDEO_STATE_PENDING_TITLE}</span>
      )}

      {video.state === VIDEO_STATE_CONVERTED && (
        <span className="tag">{VIDEO_STATE_CONVERTED_TITLE}</span>
      )}

      {video.state === VIDEO_STATE_BLOCKED && (
        <span className="tag">{VIDEO_STATE_BLOCKED_TITLE}</span>
      )}

      <div className="content">
        <h2 className="title" title={video.title}>
          {video.title.substring(0, 50)}
          {video.title.length > 50 ? "..." : ""}
        </h2>
        <p className="views">{video.views} بازدید</p>
      </div>

      <Confirm
        title="آیا مطمئن هستید؟"
        open={showDeleteModal}
        onOk={deleteThisItem}
        onCancel={() => setShowDeleteModal(false)}
      >
        از حذف این ویدیو مطمئن هستید؟
      </Confirm>

      <div className="buttons">
        <DeleteIcon
          className="button"
          onClick={() => setShowDeleteModal(true)}
        />

        <EditIcon
          className="button"
          onClick={() => navigate(`/video/${video.slug}/update`)}
        />

        <StatisticsIcon
          className="button"
          onClick={() => navigate(`/video/${video.slug}`, { state: video })}
        />
      </div>

      {isError && (
        <Grid
          sx={{ cursor: "pointer" }}
          className="errorBox"
          onClick={removeDeleteError}
        >
          خطایی رخ داده است <span>x</span>
        </Grid>
      )}
    </VideoItemWrapper>
  );
}

VideoItem.propTypes = {
  video: PropTypes.object.isRequired,
};

export default memo(VideoItem);
