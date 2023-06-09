/**
 *
 * NotificationBox
 *
 */

import React, { memo, useEffect } from "react";

import PropTypes from "prop-types";
import styled from "styled-components";
import { CloseOutlined as CloseIcon } from "@mui/icons-material";

export const NOTIFICATION_TYPE_SUCCESS = "success";
export const NOTIFICATION_TYPE_ERROR = "error";
export const NOTIFICATION_TYPE_WARNING = "warning";
export const NOTIFICATION_TYPE_INFO = "info";

export const NOTIFICATIO_TYPES = [
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_WARNING,
  NOTIFICATION_TYPE_INFO,
];

const NotificationBoxWrapper = styled.div`
  position: fixed;
  left: 1em;
  bottom: 1em;
  padding: 1em 2em;
  margin: 0;
  overflow: hidden;
  color: #fff;
  border-radius: 5em;
  box-shadow: 0 1px 4px 0px #374054;

  > .body {
    font-weigth: bold;
    padding: 0;
    margin: 0;
    white-space: pre;
  }

  > .closeIcon {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    left: 0;
    right: 0;
    background: #fff;
    color: #000;
    opacity: 0;
    transition: ease 500ms;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    > .icon {
      font-sixe: 2m;
    }
  }

  :hover {
    > .closeIcon {
      opacity: 1;
      background: rgba(255, 255, 255, 0.8);
    }
  }

  &.${NOTIFICATION_TYPE_SUCCESS} {
    background: #7dce82;
    color: #444;
  }

  &.${NOTIFICATION_TYPE_ERROR} {
    background: #ef6b53;
    color: #fff;
  }

  &.${NOTIFICATION_TYPE_WARNING} {
    background: #e8e288;
    color: #444;
  }

  &.${NOTIFICATION_TYPE_INFO} {
    background: #4cb2db;
    color: #000;
  }
`;

const Div = styled.div``;

function NotificationBox({ notification, handleHide }) {
  let timerHandler = null;
  useEffect(() => {
    if (notification && notification.title) {
      timerHandler = setTimeout(handleHide, 5000);
    }

    return () => {
      if (timerHandler) {
        clearTimeout(timerHandler);
      }
    };
  }, [notification]);

  if (!(notification && notification.title)) {
    return null;
  }

  return (
    <NotificationBoxWrapper
      className={notification.type || NOTIFICATION_TYPE_INFO}
    >
      <p className="body">{notification.title.trim()}</p>
      <Div className="closeIcon" onClick={handleHide}>
        <CloseIcon className="icon" />
      </Div>
    </NotificationBoxWrapper>
  );
}

NotificationBox.propTypes = {
  // notification: PropTypes.shape({
  //   title: PropTypes.string,
  //   type: PropTypes.oneOf(NOTIFICATIO_TYPES),
  // }).isRequired,
  // handleHide: PropTypes.func.isRequired,
};

export default memo(NotificationBox);
