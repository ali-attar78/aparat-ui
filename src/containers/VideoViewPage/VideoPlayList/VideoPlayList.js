import LoadingWithText from '../../../components/LoadingWithText';
import NoItemInList from '../../../components/NoItemInList';

import PropTypes from 'prop-types';
import React, { memo, useEffect,useState } from 'react';
import GetPlaylistWithIdService from '../../../services/GetPlaylistWithIdApi/GetPlaylistWithIdApi';
import { useNavigate } from 'react-router-dom';

import { RefreshOutlined, PlayArrow as PlayIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ROUTE_VIDEO_VIEW } from '../../../routes';
import { getAge, converSecondToTime } from '../../../utils/helpers';
import { VideoPlayListWrapper, VideoItemWrapper } from '../styles';

function VideoPlayList({ 
  playlistId,
   currentVideoId,
  
    }) {

      const [playlistData, setPlaylistData] = useState(null);
      const [errorrplaylistData, setErrorPlaylistData] = useState(null);
      const GetPlaylistWithIdApi=GetPlaylistWithIdService();
      const navigate=useNavigate();

  

  async function handleFetchPlaylistFromServer() {
    try {
      const response = await GetPlaylistWithIdApi.GetPlaylistWithId(`/playlist/${playlistId}`);
      if (response.error) {
        console.log(response.error);
        setErrorPlaylistData(response.error);
      } else {
        console.log(response.result);
        setPlaylistData(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  }

   useEffect(() => {
    handleFetchPlaylistFromServer();
  }, [playlistId]);


  return (
    <VideoPlayListWrapper>
      {!playlistData && <LoadingWithText text="در حال بارگذاری لیست پخش" />}

      {errorrplaylistData && (
        <NoItemInList
          title={
            <Button
              className="reloadPlaylist"
              onClick={handleFetchPlaylistFromServer}
            >
              اطلاعات لیست پخش دریافت نشد دوباره تلاش کنید <RefreshOutlined />
            </Button>
          }
        />
      )}

      {playlistData && (
        <div className="playlistBox">
          <div className="header">
            {playlistData.title}{' '}
            <i>تعداد ویدیو {playlistData.videos.length}</i>
          </div>

          <div className="list">
            {playlistData.videos.map(video => (
              <VideoItemWrapper
                className={`VideoItem ${
                  currentVideoId === video.id ? 'selected' : ''
                }`}
                key={video.id}
                onClick={() =>
                  navigate(
                      `${ROUTE_VIDEO_VIEW.replace(
                        ':slug',
                        video.slug,
                      )}?playlist=${playlistId}`,
                    )
                  
                }
              >
                {currentVideoId === video.id && (
                  <PlayIcon className="playIcon" />
                )}

                <img src={video.banner_link} alt={video.title} />
                <span className="duration">
                  {converSecondToTime(video.duration)}
                </span>

                <div className="videoDetail">
                  <h3 className="title">{video.title}</h3>

                  <div className="viewsAndAge">
                    <span>{video.views} بازدید.</span>
                    <span>{getAge(video.age)}</span>
                  </div>
                </div>
              </VideoItemWrapper>
            ))}
          </div>
        </div>
      )}
    </VideoPlayListWrapper>
  );
}

VideoPlayList.propTypes = {
  playlistId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  currentVideoId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};



export default memo(VideoPlayList);
