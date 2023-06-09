/**
 *
 * UploadPage
 *
 */

import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Grid, Typography, Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/CloudUpload";

import FileUploadForm from "./FileUploadForm";
import FileUploadProgress from "./FileUploadProgress";
import FileUploadInfo from "./FileUploadInfo";

import bannerUploadService from "../../services/uploadVidoeBanner/uploadVideoBanner";
import {ROUTE_MY_VIDEOS} from "../../routes";

import Layout from "../../layouts/DashboardLayout/dashboardLayout";
import Loading from "../../components/Loading/index";
import { BASE_URL } from './../../constans';

const UploadedWrapper = styled(Grid)`
  max-width: 700px;
  margin: 30px auto;

  .videoDetail {
    background: #f2f2f2;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 3px 3px #e2e2e2;

    .videoDetailBox {
      border: 2px dashed #ccc;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px;

      img {
        width: 200px;
        height: 110px;
        margin-left: 10px;
      }

      button {
        margin: 5px;
        width: 100px;
      }

      b {
        font-size: 1.2em;
        margin-bottom: 20px;
      }
    }
  }

  .withMarginTop {
    margin-top: 40px;
  }

  @media (max-width: 590px) {
    .videoDetail {
      .videoDetailBox {
        display: block !important;
        justify-content: center !important;
        text-align:center !important;
      }import { useNavigate } from 'react-router-dom';

    }  

  }
`;

const UploadWrapper = styled(Grid)`
  max-width: 700px;
  margin: auto;

  & .topTitleBar {
    border-bottom: 1px solid #ddd;
    height: 30px;
    line-height: 30px;
  }

  & .topTitleBar > span {
    border-bottom: 1px solid #666;
    display: inline-block;
    height: 100%;
    margin-top: 1px;
    padding-left: 35px;
  }

  & .topTitleBar .MuiSvgIcon-root,
  & .topTitleBar .MuiTypography-root {
    height: 100%;
    display: inline-block;
    float: right;
  }

  & .topTitleBar .MuiTypography-root {
    line-height: 30px;
    font-weight: bold;
    font-size: 0.8rem;
  }

  & .topTitleBar .MuiSvgIcon-root {
    margin: 0 5px;
  }

  & .videoUploadInfoWrapper {
    background: #f7f7f7;
    border-radius: 3px;
    box-shadow: 0 0 3px #dadada;
    padding: 1rem;
  }
`;

export function UploadPage() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileExist, setfileExist] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [bannerId, setBannerId] = useState(null);
  const [bannerExist, setBannerExist] = useState(false);
  const navigate = useNavigate();


  const [videoData, setVideoData] = useState(null);
  const uploadVideoBanner = bannerUploadService();

  const handleUploadProgress = (progress) => {
    setUploadProgress(progress);
  };

  const handleVideoData = (data) => {
    console.log(data);
    setVideoData(data);
  };

  const fileExistStatus = (fileStatus) => {
    setfileExist(fileStatus);
  };

  const handleVideoId = (id) => {
    setVideoId(id);
  };


  useEffect(() => {
    if (bannerId !== null) {
      setBannerExist(false);
    }
  }, [bannerId]);


  const handleBannerFile = async (banner) => {
    setBannerExist(true);
    try {
      const response = await uploadVideoBanner.uploadVideoBanner(
        banner,
        "/video/upload-banner"
      );
      
      console.log("banner:"+response.result.banner);
      setBannerId(response.result.banner);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout showSidebar={false}>
       {bannerExist  ? <Loading /> : null}  
           <Helmet>
        <title>بارگذاری ویدیو</title>
        <meta name="description" content="بارگذاری ویدیو" />
      </Helmet>
      {!videoData && (
        <UploadWrapper container>
          <Grid item xs={12} style={{ justifyContent: "center" }}>
            <div className="topTitleBar">
              <span>
                <UploadIcon />
                <Typography variant="caption">بارگذاری ویدیو</Typography>
              </span>
            </div>
          </Grid>
          {!fileExist ? (
            <Grid item xs={12}>
              <FileUploadForm
                onUploadProgress={handleUploadProgress}
                onFileExist={fileExistStatus}
                onVideoUploadId={handleVideoId}
              />
            </Grid>
          ) : (
            <Grid item xs={12} className="videoUploadInfoWrapper">
              <FileUploadProgress
                percentValue={uploadProgress}
                onSelectBanner={handleBannerFile}
                videoBannerId={bannerId}
              />
              <FileUploadInfo
                videoUploadId={videoId}
                BannerUploaded={bannerId}
                onVideoData={handleVideoData}
              />
            </Grid>
          )}
        </UploadWrapper>
      )}
      {videoData && (
        <UploadedWrapper container>
        <Grid item xs={12}>
          <div className="videoDetail">
            <div className="videoDetailBox">
            <img src={videoData.banner_link} alt="بنر ویدیو" />
              <div>
                <b>ویدیو شما با موفقیت بارگذاری شد</b>
                <p>
                  ویدیوی شما پس از پردازشی کوتاه بر روی آپارات به نمایش
                  درخواهد آمد
                </p>
              </div>
              <Button variant="outlined">مشاهده ویدیو</Button>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} className="withMarginTop">
          <Button
            color="danger"
            variant="contained"
            size="large"
            className="btn btn-publish"
            style={{color: "#fff"}}
            onClick={() => navigate(ROUTE_MY_VIDEOS)}
          >
            مدیریت ویدیو ها
          </Button>
        </Grid>
      </UploadedWrapper>
      )}
    </Layout>
  );
}

export default UploadPage;
