/**
 *
 * VideoListItem
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { converSecondToTime, getAge } from '../../utils/helpers';
import { ROUTE_VIDEO_VIEW } from '../../routes';

const VideoListItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 180px;
  padding: 0.1em;
  margin-bottom: 0.5em;
  cursor: pointer;

  .paddingWrapper {
    background: #fff;
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
      top: 67px;
      line-height: 1em;
      height: 1.5em;
      min-width: 32px;
      border-radius: 2px;
      text-align: center;
      opacity: 0.8;
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

      .views,
      .channelName {
        padding: 0.5em 0;
        margin: 0.2em 0;
        font-size: 0.8em;
      }
    }

    .errorBox {
      background: #ff5c5c;
      color: #fff;
      padding: 0.5em;
      font-size: 1em;
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
  }
`;

const Img = styled.img`
  height: 90px;
  width: 100%;
`;

function VideoListItem({ video, channelName, dispatch }) {
  const navigate = useNavigate();
  function handleRedirectToShowVideoPage() {
    navigate(ROUTE_VIDEO_VIEW.replace(':slug', video.slug));
  }

  return (
    <VideoListItemWrapper onClick={handleRedirectToShowVideoPage}>
      <div className="paddingWrapper">
        <Img src={video.banner_link} alt={video.title} />

        <b className="duration">{converSecondToTime(video.duration)}</b>

        <div className="content">
          <h2 className="title" title={video.title}>
            {video.title.substring(0, 50)}
            {video.title.length > 50 ? '...' : ''}
          </h2>

          {channelName && <div className="channelName">{channelName}</div>}

          <p className="views">
            {video.views} بازدید . {getAge(video.age)}
          </p>
        </div>
      </div>
    </VideoListItemWrapper>
  );
}



export default memo(VideoListItem);
