/**
 *
 * ManageVideosPage
 *
 */

import ErrorMessage from "../../components/ErrorMessage";
import LoadingWithText from "../../components/LoadingWithText";
import ReloaderMessage from "../../components/ReloaderMessage";

import DashboardLayout from "../../layouts/DashboardLayout/dashboardLayout";
import GetVideosService from "../../services/GetVideoApi/GetVideoListApi";
import GetCategoriesService from "../../services/GetCategoriesApi/getCategoryListApi";

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import VideoModal from "./VideoModal/VideoModal";
import VideosTable from "./VideosTable/VideosTable";
import Notification from "../../components/Notifications";

export function ManageVideosPage({}) {
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState(null);
  const [videosError, setVideosError] = useState(null);

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const GetVideosApi = GetVideosService();
  const GetCategoriesApi = GetCategoriesService();

  const [pageSize, setPageSize] = useState(10);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [changeState, setChangeState] = useState(null);

  async function getVideosFromServer() {
    try {
      const VideoResponse = await GetVideosApi.getVideoList(
        `/video?page=${page || 1}&per_page=${pageSize || 10}`
      );
      const CategoryResponse = await GetCategoriesApi.getCategory("/category");

      if (VideoResponse.error || CategoryResponse.error) {
        console.log(VideoResponse.error || CategoryResponse.error);
        setVideosError(VideoResponse.error || CategoryResponse.error);
      } else {
        console.log(VideoResponse.result);

        const { data: videos } = VideoResponse.result;
        const { result: categories } = CategoryResponse;
        for (let i = 0; i < videos.length; i++) {
          console.log(videos[i].category_id);
          const category = categories.find(
            (c) => c.id === videos[i].category_id
          );
          videos[i].category = category || { title: "Unknown Category" };
        }
        const updatedVideoResponse = {
          ...VideoResponse,
          result: { ...VideoResponse.result, data: videos },
        };
        setVideos(updatedVideoResponse.result);
        console.log(videos);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const emptyList = !loading && videos && videos.data && !videos.data.length;

  useEffect(() => {
    getVideosFromServer();
  }, [page, pageSize, changeState]);

  // useEffect(() => {
  //   if (changeVideoState.data && videos && videos.data) {
  //     const selectedVideoItems = videos.data.filter(
  //       v => v.id === changeVideoState.id,
  //     );
  //     setSelectedVideo(
  //       selectedVideoItems.length ? selectedVideoItems[0] : null,
  //     );
  //   }
  // }, [changeVideoState.data]);

  // function getVideosFromServer() {
  //   dispatch(getVideosAction({ page, size: pageSize }));
  // }

  function handlePageChange(p, s) {
    setPage(p);
    setPageSize(s);
  }

  return (
    <DashboardLayout fullWidth>
      <Helmet>
        <title>مدیریت ویدیوها</title>
        <meta name="description" content="مدیریت ویدیوها" />
      </Helmet>

      {!!(videos && videos.data && videos.data.length) && (
        <VideosTable
          videos={videos.data}
          page={page}
          size={pageSize}
          total={videos.total}
          onChangePage={handlePageChange}
          onRowClick={setSelectedVideo}
        />
      )}

      {emptyList && (
        <ReloaderMessage
          message="هیچ ویدیو ای یافت نشد"
          reloadMessage="بارگذاری مجدد"
          onReload={getVideosFromServer}
        />
      )}

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          onSuccessMessage={setSuccessMessage}
          onErrorMessage={setErrorMessage}
          onChangeState={setChangeState}
        />
      )}

      {loading && <LoadingWithText text="در حال دریافت لیست ویدیو ها" />}

      <Notification
        message={successMessage || errorMessage}
        severity={successMessage ? "success" : "error"}
        onClose={() => {
          setSuccessMessage(null);
          setErrorMessage(null);
        }}
      />

      {videosError && (
        <ErrorMessage
          error={videosError}
          closeable={false}
          forceMessage={
            <ReloaderMessage
              message="در دریافت اطلاعات ویدیو ها خطایی به وجود آمده است"
              reloadMessage="بارگذاری مجدد"
              onReload={getVideosFromServer}
            />
          }
        />
      )}
    </DashboardLayout>
  );
}

ManageVideosPage.propTypes = {
  // videos: PropTypes.object,
  // changeVideoState: PropTypes.object,
  // dispatch: PropTypes.func.isRequired,
};

export default ManageVideosPage;
