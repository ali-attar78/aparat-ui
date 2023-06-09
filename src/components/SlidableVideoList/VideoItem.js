import React, { memo } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { converSecondToTime, getAge } from '../../utils/helpers';
import { ROUTE_VIDEO_VIEW, ROUTE_MY_CHANNEL } from '../../routes';

import { VideoItemWrapper, UserLink } from './styles';

function VideoItem({ video, dispatch }) {

  const navigate =useNavigate();

  function handleClick() {
    // dispatch(push(ROUTE_VIDEO_VIEW.replace(':slug', video.slug)));
    navigate(ROUTE_VIDEO_VIEW.replace(':slug', video.slug));
  }

  function handleRedirectToUserPage(e) {
    e.preventDefault();
    e.stopPropagation();
    navigate(ROUTE_MY_CHANNEL.replace(':name', video.user.channel.name));

    // dispatch(push(ROUTE_MY_CHANNEL.replace(':name', video.user.channel.name)));
  }

  return (
    <VideoItemWrapper onClick={handleClick}>
      <img src={video.banner_link} alt={video.title} />
      <div className='videoContent'>
      <span className="duration">{converSecondToTime(video.duration)}</span>
      <h3 className="title" title={video.title}>
        {video.title.substring(0, 50)}
        {video.title.length > 50 ? '...' : ''}
      </h3>

      <UserLink className="user" onClick={handleRedirectToUserPage}>
        {video.user.name}
      </UserLink>

      <b className="views">
        <span>{video.views} بازدید</span>
        {' - '}
        <span>{getAge(video.age)}</span>
      </b>
      </div>
    </VideoItemWrapper>
  );
}

VideoItem.propTypes = {
  // video: PropTypes.object.isRequired,
  // dispatch: PropTypes.func.isRequired,
};


export default memo(VideoItem);
