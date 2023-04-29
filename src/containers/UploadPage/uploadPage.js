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


import FileUploadForm from "./FileUploadForm";
import FileUploadProgress from "./FileUploadProgress";
import FileUploadInfo from "./FileUploadInfo";



import Layout from "../../layouts/DashboardLayout/dashboardLayout";

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
        <FileUploadForm  />
        </Grid>

        <Grid item xs={12} className="videoUploadInfoWrapper" >
        <FileUploadProgress  />
        <FileUploadInfo  />

        </Grid>
        
      </UploadWrapper>
    </Layout>
  );
}

export default UploadPage;
