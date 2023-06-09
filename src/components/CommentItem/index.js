/**
 *
 * CommentItem
 *
 */

import React, { memo, useState } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Button } from "@mui/material";

import { getAge } from "../../utils/helpers";
import { COMMENT_STATE_PENDING } from "../../constans";
import CountingTextArea from "../CountingTextArea";
import { useNavigate } from "react-router-dom";
import PostCommentService from "../../services/PostCommentApi/PostCommentApi";
import AcceptCommentService from "../../services/AcceptCommentApi/AcceptCommentApi";
import DeleteCommentService from "../../services/DeleteCommentApi/DeleteCommentApi";
import { isAdminUser,getAuth } from "../../utils/auth";
import {ROUTE_LOGIN} from '../../routes';

const CommentItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background: #fff;
  width: 100%;
  box-shadow: rgb(208 204 204) 0px 0px 2px 0px;
  position: relative;
  margin-bottom: 2em;
  padding: 0.8em;

  &.isSubItem {
    background: #f5f5f9;
  }

  > .userAvatarWapper {
    padding-left: 0.8em;

    > .userIcon {
      width: 30px;
      height: 30px;
      border: 1px solid #ccc;
      background: #eee;
      border-radius: 50%;
      margin: 0.1em;
    }
  }

  > .commentWrapper {
    width: 100%;

    > .header {
      > .userInfo {
        > .userName {
          color: #333;
          display: inline-block;
        }

        > .old {
          margin-right: 0.8em;
          display: inline-block;
          font-size: 0.9em;
        }
      }
    }

    > .body {
      margin-left: 0.8em;

      > .subComments {
      }
    }

    > .footer {
      > .btn {
        border-radius: 15px;
        padding: 0.3em 0;
        margin: 0 0.2em;

        &.btn-accept:not(:disabled) {
          background: #05a3e8;
          color: #fff;

          :hover {
            opacity: 0.8;
          }
        }
      }
    }
  }

  > .bannerWrapper {
    width: 150px;

    > img {
      width: 150px;
      height: 100px;
    }
  }
`;

function CommentItem({
  comment,
  onRemoveComment,
  onPostNewComment,
  onAcceptComment,
  isSubItem,
  showVideoImage,
}) {
  const [showAnswerBox, setShowAnswerBox] = useState(false);
const navigate=useNavigate();
  const PostCommentApi = PostCommentService();
  const AcceptCommentApi = AcceptCommentService();
  const DeleteCommentApi = DeleteCommentService();

  async function handleRemoveComment() {
    try {
      const response = await DeleteCommentApi.DeleteComment(
        `/comment/${comment.id}`
      );
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response.result);
        onRemoveComment(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAcceptComment() {
    const data = {
      state: "accepted",
    };

    try {
      const response = await AcceptCommentApi.AcceptComment(
        data,
        `/comment/${comment.id}/state`
      );
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response.result);
        onAcceptComment(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAnswerChange(value) {

    if(getAuth()){

    const data = {
      video_id: comment.video_id,
      parent_id: comment.id,
      body: value,
    };

    try {
      const response = await PostCommentApi.PostComment(
        data,
        "/comment/create"
      );
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response.result);
        onPostNewComment(response.result);
      }
    } catch (error) {
      console.error(error);
    }

    setShowAnswerBox(false);
  }
  else{
    navigate(ROUTE_LOGIN)
  }
  }

  return (
    <CommentItemWrapper className={isSubItem ? "isSubItem" : ""}>
      <div className="userAvatarWapper">
        <img
          className="userIcon"
          src={comment.user.avatar}
          alt="تصویر کاربری"
        />
      </div>

      <div className="commentWrapper">
        <div className="header">
          <div className="userInfo">
            <b className="userName">{comment.user.name}</b>
            <span className="old">{getAge(comment.age)}</span>
          </div>
        </div>

        <div className="body">
          <p>{comment.body}</p>

          {!!(comment.children && comment.children.length) && (
            <div className="subComments">
              {comment.children.map((subComment) => (
                <CommentItem
                  key={subComment.id}
                  onRemoveComment={onRemoveComment}
                  onPostNewComment={onPostNewComment}
                  comment={subComment}
                  onAcceptComment={onAcceptComment}
                  isSubItem
                  showVideoImage={showVideoImage}
                />
              ))}
            </div>
          )}

          {showAnswerBox && (
            <div className="answerBox">
              <CountingTextArea maxLength={15} onChange={handleAnswerChange} />
            </div>
          )}
        </div>

        <div className="footer">
          {!isSubItem && (
            <Button
              className="btn"
              variant="outlined"
              disabled={showAnswerBox}
              onClick={() => setShowAnswerBox(true)}
            >
              پاسخ دادن
            </Button>
          )}

      {(isAdminUser()||getAuth()) && (
            <>
              {comment.state === COMMENT_STATE_PENDING && (
                <Button
                  className="btn btn-accept"
                  onClick={handleAcceptComment}
                >
                  تایید
                </Button>
              )}
              <Button
                className="btn"
                variant="outlined"
                onClick={handleRemoveComment}
              >
                حذف
              </Button>
            </>
          )}
        </div>
      </div>

      {showVideoImage && !isSubItem && (
        <div className="bannerWrapper">
          <img
            className="img"
            src={
              comment.video_banner
                ? comment.banner_path + comment.video_banner
                : `${comment.banner_path}../../img/no-video.jpg`
            }
            alt="تصویر ویدیو"
          />
        </div>
      )}
    </CommentItemWrapper>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  isSubItem: PropTypes.bool,
};

CommentItem.defaultProps = {
  isSubItem: false,
  showVideoImage: true,
};

export default memo(CommentItem);
