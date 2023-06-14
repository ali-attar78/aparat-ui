import React, { memo, useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { converSecondToTime, getAge } from '../../utils/helpers';
import { ROUTE_VIDEO_VIEW, ROUTE_MY_CHANNEL } from '../../routes';

import { VideoItemWrapper, UserLink } from './styles';

function VideoItem({ video }) {

  const navigate = useNavigate();
  const videoRef = useRef(null);
  const bannerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoadingError, setIsVideoLoadingError] = useState(false);
  const [isBannerLoadingError, setIsBannerLoadingError] = useState(false);

  useEffect(() => {
    if (isHovered) {
      if (videoRef.current && !isVideoLoadingError) {
        videoRef.current.play();
      }
    } else {
      if (videoRef.current && !isVideoLoadingError) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, isVideoLoadingError]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('canplaythrough', handleVideoCanPlayThrough);
      videoRef.current.addEventListener('timeupdate', handleVideoTimeUpdate);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('canplaythrough', handleVideoCanPlayThrough);
        videoRef.current.removeEventListener('timeupdate', handleVideoTimeUpdate);
      }
    };
  }, []);

  function handleClick() {
    navigate(ROUTE_VIDEO_VIEW.replace(':slug', video.slug));
  }

  function handleRedirectToUserPage(e) {
    e.preventDefault();
    e.stopPropagation();
    navigate(ROUTE_MY_CHANNEL.replace(':name', video.user.channel.name));

  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function handleVideoCanPlayThrough() {
    setIsVideoLoadingError(false);
  }

  function handleVideoTimeUpdate() {
    if (videoRef.current && videoRef.current.currentTime >= videoRef.current.duration) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  function handleVideoError() {
    setIsVideoLoadingError(true);
  }

  function handleBannerError() {
    setIsBannerLoadingError(true);
  }

  return (
    <VideoItemWrapper onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isHovered && !isVideoLoadingError ? (
        <video ref={videoRef} autoPlay muted loop onError={handleVideoError}>
          <source src={video.link} type="video/mp4" />
        </video>
      ) : !isBannerLoadingError ? (
        <img ref={bannerRef} src={video.banner_link} alt={video.title} onError={handleBannerError} />
      ) : (
        <div>Error loading banner image</div>
      )}
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
 
};

export default memo(VideoItem);