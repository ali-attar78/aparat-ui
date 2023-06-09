import { ROUTE_VIDEO_VIEW } from "../../../routes";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

import { getAge, converSecondToTime } from "../../../utils/helpers";
import { RelatedVideosWrapper, VideoItemWrapper } from "../styles";

function RelatedVideos({
  videos,
}) {

 const navigate=useNavigate();
  return (
    <RelatedVideosWrapper>
      {videos.map((video) => (
        <VideoItemWrapper
          key={video.id}
          onClick={() => {
            console.log('Clicked on video', video.slug);
            navigate(ROUTE_VIDEO_VIEW.replace(':slug', video.slug));
          }}
        >
          <img src={video.banner_link} alt={video.title} />
          <span className="duration">{converSecondToTime(video.duration)}</span>

          <div className="videoDetail">
            <h3 className="title">{video.title}</h3>
            {video.playlist[0] && (
              <span className="playlist">{video.playlist[0].title}</span>
            )}
            <div className="viewsAndAge">
              <span>{video.views} بازدید.</span>
              <span>{getAge(video.age)}</span>
            </div>
          </div>
        </VideoItemWrapper>
      ))}
    </RelatedVideosWrapper>
  );
}

RelatedVideos.propTypes = {
  // videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  // dispatch: PropTypes.func.isRequired,
};

export default memo(RelatedVideos);
