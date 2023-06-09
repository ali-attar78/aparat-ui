/**
 *
 * SlidableVideoList
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import { SlidableWrapper } from "./styles";
import VideoItem from "./VideoItem";

function SlidableVideoList({ category }) {
  const itemsCount = category.videos.length;
  return (
    <SlidableWrapper itemsCount={itemsCount}>
      <h2>{category.title}</h2>

      <div className="slideWrapper">
        <div className="slideWrapperItems">
          {category.videos.map((video) => (
            <VideoItem key={video.id} video={video} />
          ))}
        </div>
      </div>
    </SlidableWrapper>
  );
}

SlidableVideoList.propTypes = {
  category: PropTypes.object.isRequired,
};

export default memo(SlidableVideoList);
