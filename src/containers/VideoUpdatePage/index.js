/**
 *
 * VideoUpdatePage
 *
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import UpdateVideoForm from "./UpdateVideoForm/UpdateVideoForm";

import Loading from "../../components/LoadingWithText";
import GetVideoInfo from "../../services/GetVideoInfo/GetVideoInfo";

import DashboardLayout from "../../layouts/DashboardLayout/dashboardLayout";

export function VideoUpdatePage() {
  const VideoInfo = GetVideoInfo();
  const [baseError, setBaseError] = useState(null);
  const [baseVideo, setBaseVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    getVideoInformation();
  }, []);

  async function getVideoInformation() {
    try {
      const { result, error } = await VideoInfo.VideoInfo(`/video/${slug}`);
      if (error) {
        setBaseError(error);
        console.log( error.response.status);
      } else {
        setBaseVideo(result);
        console.log(result);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('An error occurred:', error);
      setIsLoading(false);
    }
  }

  return (
    <DashboardLayout style={{ margin: 'auto' }}>
      <Helmet>
        <title>ویرایش ویدیو</title>
        <meta name="description" content="Description of VideoUpdatePage" />
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        (baseError)?
        (
        <ErrorMessage
        error={baseError}
        options={{ 404: 'ویدیو مورد نظر یافت نشد' }}
      />
        )
      :
      (
        baseVideo && <UpdateVideoForm video={baseVideo} />
      )
        
       
      )}
    </DashboardLayout>
  );
}

VideoUpdatePage.propTypes = {};

export default VideoUpdatePage;
