import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import VideoPlayer from "../../../components/VideoPlayer";
import changeStateVideoService from "../../../services/ChangeStateVideoApi/ChangeStateVideoApi";

import PropTypes from "prop-types";
import React, { memo, useState } from "react";

import {
  VIDEO_STATE_ACCEPTED,
  VIDEO_STATE_BLOCKED,
  VIDEO_STATE_CONVERTED,
} from "../../../constans";
import { VideoModalWrapper } from "../styles";

function VideoModal({
  video,
  onClose,
  onErrorMessage,
  onSuccessMessage,
  onChangeState,
}) {
  const changeStateVideoApi = changeStateVideoService();
  const [loading, setLoading] = useState(false);

  async function handleChangeStateVideo(state) {
    setLoading(true);
    try {
      const response = await changeStateVideoApi.ChangeStateVideo(
        state,
        `/video/${video.slug}/state`
      );
      if (response.error) {
        console.log(response.error);
        onErrorMessage("تغییر وضعیت با خطا مواجه شد");
      } else {
        console.log(response.result);
        onSuccessMessage("تغییر وضعیت با موفقیت انجام شد");
        onChangeState(response.result);
        setLoading(false);
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <VideoModalWrapper open>
      <DialogTitle>{video.title}</DialogTitle>

      <DialogContent>
        <VideoPlayer video={video} />
      </DialogContent>

      <DialogActions className="DialogActions">
        <div>
          {(video.state === VIDEO_STATE_CONVERTED ||
            video.state === VIDEO_STATE_BLOCKED) && (
            <Button
              color="primary"
              variant="outlined"
              disabled={loading}
              onClick={() => {
                handleChangeStateVideo(VIDEO_STATE_ACCEPTED);
              }}
            >
              تایید ویدیو
            </Button>
          )}

          {video.state !== VIDEO_STATE_BLOCKED && (
            <Button
              color="secondary"
              variant="outlined"
              disabled={loading}
              onClick={() => {
                handleChangeStateVideo(VIDEO_STATE_BLOCKED);
              }}
            >
              بلاک کردن ویدیو
            </Button>
          )}
        </div>

        <Button color="secondary" disabled={loading} onClick={onClose}>
          انصراف
        </Button>
      </DialogActions>
    </VideoModalWrapper>
  );
}

VideoModal.propTypes = {
  video: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default memo(VideoModal);
