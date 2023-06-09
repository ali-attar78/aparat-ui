import React, { memo } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Grid, Tooltip } from '@mui/material';
import { converSecondToTime } from '../../../utils/helpers';

import EditIcon from '@mui/icons-material/Edit';
import ShowIcon from '@mui/icons-material/FileCopyOutlined';
import { useNavigate } from "react-router-dom";
import { ROUTE_VIDEO_VIEW } from './../../../routes';




const VideoDetailWrapper = styled(Grid)`
  flex-wrap: nowrap !important;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 3px 0px #c2c1c1;


  .imageGrid {
    position: relative;
    max-width: 300px;
    padding: 10px 12px !important;

    img {
      height: 150px;
      width: 100%;
      border-bottom: 1px solid #eee;
      cursor: pointer;
    }

    

    .duration {
      position: absolute;
      left: 1.1em;
      bottom: 1.5em;
      background: #f9b03a;
      border: 1px solid #c78d36;
      padding: 4px 2px;
      margin: 0;
      width: auto;
      line-height: 1em;
      height: 1.5em;
      min-width: 32px;
      border-radius: 2px;
      text-align: center;
      opacity: 0.8;
    }
  }

  .videoInfo {
    .title {
      
      margin: 0.5em 0.4em;
      font-size: 1.2em;
    }

    .view {
      margin: 0.8em 0.4em;
      font-size: 0.9em;
    }

    .info {
      margin: 0.5em 0.4em;
    }
  }

  .btnIcon {
    position: absolute;
    top: 0.5em;
    border: 1px solid #e8e8e8;
    border-radius: 50%;
    padding: 3px;
    width: 30px;
    height: 30px;
    background: #eee;
    cursor: pointer;

    :hover,
    :focus {
      border-color: #f5f5f5;
      background: #f5f5f5;
    }

    &.showIcon {
      left: 1em;
    }

    &.editIcon {
      left: 3em;
    }
  }

  @media (max-width: 760px) {
    .imageGrid {
      max-width: 200px;

      img {
        height: 120px;
      }
    }

   & .duration {
      left: 1.2em !important;
      bottom: 1.4em !important;
    }
  }
  }

  @media (max-width: 480px) {
    flex-wrap: wrap !important;

    .imageGrid {
      max-width: 100%;
    }
  }
`;

function VideoDetail({ video }) {
  const navigate = useNavigate();

  function getAge() {
    if (video.age <= 7) return `${video.age} روز پیش`;

    if (video.age <= 30) return `${Math.floor(video.age / 7)} هفته پیش`;

    if (video.age <= 365) return `${Math.floor(video.age / 12)} ماه پیش`;

    return `${Math.floor(video.age / 365)} سال پیش`;
  }

  // eslint-disable-next-line no-console
  console.log("title:"+video.title);


  return (
    <VideoDetailWrapper container spacing={2}>
      <Grid item className="imageGrid">
        <img src={video.banner_link} alt={video.title} />
        <b className="duration">{converSecondToTime(video.duration)}</b>
      </Grid>
      <Grid item className="videoInfo">
        <Tooltip title={video.title}>
          <h2 className="title">{video.title.substr(0, 50)}</h2>
        </Tooltip>
        <p className="view">
          {video.views} بازدید .<span>{getAge()}</span>
        </p>

        <Tooltip title={video.info}>
          <p className="info">{video.info.substr(0, 150)}</p>
        </Tooltip>
      </Grid>

      <EditIcon
        className="btnIcon editIcon"
        onClick={() => navigate(`/video/${video.slug}/update`)}
      />
      {/* TODO: باید به صفحه نمایش ویدیو در سمت خانه منتقل بشه */}
      <ShowIcon
        className="btnIcon showIcon"
        onClick={() => navigate(ROUTE_VIDEO_VIEW.replace(':slug',video.slug ))}
      />
    </VideoDetailWrapper>
  );
}

VideoDetail.propTypes = {
  video: PropTypes.object.isRequired,
};



export default memo(VideoDetail);
