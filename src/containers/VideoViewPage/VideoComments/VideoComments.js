import CommentList from "../../../components/CommentList";
import CountingTextArea from "../../../components/CountingTextArea";

import PropTypes from "prop-types";
import React, { memo, useEffect, useState } from "react";
import {getAuth}from '../../../utils/auth';
import {ROUTE_LOGIN} from '../../../routes';


import { VideoCommentsWrapper } from "../styles";
import AddCommentService from "../../../services/PostCommentApi/PostCommentApi";
import { useNavigate } from "react-router-dom";

function VideoComments({ video,onCommentChange,onPostNewAnswer }) {
  const [commentDefaultValue, setCommentDefaultValue] = useState("");
  const [addCommentResponse, setAddCommentResponse] = useState(null);
  const [errorAddCommentResponse, setErrorAddCommentResponse] = useState(null);
  const navigate=useNavigate();

  const AddCommentApi = AddCommentService();

  async function handleNewComment(value) {

    if(getAuth()){

    const data = {
      video_id: video.id,
      parent_id: null,
      body: value,
    };

    try {
      const response = await AddCommentApi.PostComment(data, "/comment/create");
      if (response.error) {
        console.log(response.error);
        setErrorAddCommentResponse(response.error);
      } else {
        console.log(response.result);
        setAddCommentResponse(response.result);
        onCommentChange(response.result);
      }
    } catch (error) {
      console.error(error);
    }

  }else(
    navigate(ROUTE_LOGIN)
  )

  }

  useEffect(() => {
    if (addCommentResponse && addCommentResponse.parent_id === null) {
      setCommentDefaultValue("");
    }
  }, [addCommentResponse]);

  return (
    <VideoCommentsWrapper>
      <CountingTextArea
      
        defaultValue={commentDefaultValue}
        maxLength={200}
        placeholder="نظر خود را وارد نمایید"
        cancelable={false}
        onChange={handleNewComment}
      />


      <CommentList
        myComments={video.comments}
        showVideoImage={false}
        customNotFoundTitle="هیچ نظری برای این ویدیو ثبت نشده است"
        onPostNewAnswer={onPostNewAnswer}
      />
    </VideoCommentsWrapper>
  );
}

VideoComments.propTypes = {};

export default memo(VideoComments);
