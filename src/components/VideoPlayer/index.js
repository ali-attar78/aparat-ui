/**
 *
 * VideoPlayer
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";

import "../../../node_modules/video-react/dist/video-react.css";

import {
  Player,
  BigPlayButton,
  LoadingSpinner,
  ControlBar,
  PlaybackRateMenuButton,
  ForwardControl,
  ReplayControl,
} from "video-react";
import { VideoPlayerWrapper } from "./styles";

function VideoPlayer({ video }) {
  return (
    <VideoPlayerWrapper>
      <Player poster={video.banner_link} src={video.link}>
        <LoadingSpinner />
        <ControlBar autoHide disableCompletely={false}>
          <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
          <ReplayControl seconds={10} order={1.1} />
          <ForwardControl seconds={30} order={1.2} />
        </ControlBar>
        <BigPlayButton position="center" />
      </Player>
    </VideoPlayerWrapper>
  );
}

VideoPlayer.propTypes = {
  video: PropTypes.object.isRequired,
};

export default memo(VideoPlayer);
