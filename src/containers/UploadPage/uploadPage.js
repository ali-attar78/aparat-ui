/**
 *
 * UploadPage
 *
 */

import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Grid, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/CloudUpload";
import UpCloudIcon from "@mui/icons-material/CloudQueue";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import { FileDrop } from "react-file-drop";

import Layout from "../../layouts/DashboardLayout/dashboardLayout";
import { FormatAlignJustify } from "@mui/icons-material";

const UploadWrapper = styled(Grid)`
  max-width: 600px;
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

  & .fileDrop {
    position: relative;
    border: 2px dashed #ddd;
    margin: 25px 0;
    padding: 25px;
    height: 150px;
  }

  & .fileDrop .MuiSvgIcon-root {
    position: absolute;
    left: 30px;
    top: -10px;
    color: #cfcfcf;
    font-size: 160px;
    height: 100%;
  }

  & .fileDrop .MuiSvgIcon-root.upArrowIcon {
    font-size: 120px;
    left: 48px;
    top: 16px;
  }

  & .fileDrop > div,
  & .fileDrop b {
    display: block;
    width: 300px;
    text-align: center;
    color: #ccc;
    font-size: 1.2rem;
  }

  & .fileDrop b {
    margin-bottom: 10px;
  }

  & .fileDrop .fileDropTitle {
    color: #6a6a6a;
  }

  & .fileDrop button {
    font-size: 0.9rem;
    font-weight: bold;
    color: #757575;
    border: 1px solid #cbcbcb;
    background: #fff;
    border-radius: 2px;
    padding: 5px 15px;
  }
`;

export function UploadPage() {
  const handleDrop = (files) => {
    if (files) {
      console.log(files);
    }
  };

  return (
    <Layout showSidebar={false} >
      <Helmet>
        <title>بارگذاری ویدیو</title>
        <meta name="description" content="بارگذاری ویدیو" />
      </Helmet>

      <UploadWrapper container >
        <Grid item xs={12} style={{  justifyContent: 'center' }}>
          <div className="topTitleBar">
            <span>
              <UploadIcon />
              <Typography variant="caption">بارگذاری ویدیو</Typography>
            </span>
          </div>
        </Grid>

        <Grid item xs={12} >
          <FileDrop onDrop={handleDrop} className="fileDrop">
            <div >
              <b className="fileDropTitle">فایل خود را اینجا بکشید</b>
              <b>یا</b>
              <button type="button">انتخاب فایل</button>
            </div>

            <UpCloudIcon />
            <ArrowUpwardIcon className="upArrowIcon" />
          </FileDrop>
        </Grid>
      </UploadWrapper>
    </Layout>
  );
}

export default UploadPage;
