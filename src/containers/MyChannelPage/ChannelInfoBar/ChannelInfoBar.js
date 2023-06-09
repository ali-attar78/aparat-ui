import React, { memo,useState,useEffect } from "react";
import styled from "styled-components";
import { Grid, Button } from "@mui/material";
import SettingIcon from "@mui/icons-material/Settings";
import FollowIcon from "@mui/icons-material/AddOutlined";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { ROUTE_LOGIN, ROUTE_MY_PROFILE } from "../../../routes";
import { Co2Sharp } from "@mui/icons-material";

import FollowService from "../../../services/FollowApi/FollowApi";
import UnFollowService from "../../../services/UnFollowApi/UnFollowApi";
import GetFollowerService from "../../../services/GetFollowerApi/GetFollowerApi";
import GetFollowingsService from "../../../services/GetFollowingApi/GetFollowingApi";





const HEIGTH = 60;
const ChannelInfoBarWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 10px 15px 0px rgba(217, 217, 217, 0.3);
  top: 150px;
  position: absolute;
  height: ${HEIGTH}px;
  width: 100%;
  left: 0;
  right: 0;

  .containerWrapper {
    justify-content: space-around;

    .userInfo {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: ${HEIGTH}px;

      .userAvatar {
        background-color: #fff;
        width: 100px;
        height: 100px;
        border-radius: 100%;
        border: 2px solid #eee;
        padding: 0.5em;
        margin-top: -50px;
        margin-right: 50px;
      }

      .channelName {
        color: #000;
        margin: 1em 0;
        padding: 0 1em;
        font-size: 1.2em;
      }

      .settingBtn {
        border-radius: 15px;
        padding: 0.5em;
        margin: 0 0.2em;
        background: #05a3e8;
        color: #fff;

        :hover {
          opacity: 0.8;
        }

        .settingIcon {
          font-size: 1.3em !important;
          margin-left: 0.2em;
        }
      }
    }

    .statistics {
      display: flex;
      height: 60px;
      align-items: center;

      .statisticLabel {
        font-size: 0.9em;
        color: #555;
        padding: 0 0.5em;
        text-align: center;

        b {
          color: #000;
          display: block;
          font-weigth: bold;
          font-size: 1.3em;
          margin-bottom: 0.2em;
        }
      }
    }
  }
`;

function ChannelInfoBar({ data}) {

  const btnTitle={
doingFollow: "دنبال کردن",
doingUnFollow:"دنبال شده",
setting:"تنظیمات"
  };


  const navigate = useNavigate();
  const { name } = useParams();
  const [follow,setFollow]=useState(null);
  const [unFollow,setUnFollow]=useState(null);
  const [isFollower,setIsFollower]=useState(null);
  const [isFollowing,setIsFollowing]=useState(null);
  const [ButtonTitle,setButtonTitle]=useState(btnTitle.setting);



  const FollowApi=FollowService();
  const UnFollowApi=UnFollowService();
  const GetFollowerApi=GetFollowerService();
  const GetFollowingsApi = GetFollowingsService();


  const channelName = name;

  let auth = null;
  let isMe=false;
  let isLogin = false;

 

  try {
    auth = JSON.parse(localStorage.getItem("auth"));
    if(auth){
      isLogin = true;
      isMe = isLogin ? auth.user.channel.name === channelName : false;
    }
   

  } catch (error) {
    console.error("this user is not logged in");
  }


  async function handleFollowUser() {

    if(isLogin) {

    try {
      const response = await FollowApi.doFollow(`/user/${channelName}/follow`);
      if (response.error) {
        console.log(response.error);
        // setResponseError(response.error);
      } else {
        console.log(response.result);
        setFollow(response.result);
      }
    } catch (error) {
      console.error(error);
    }

  }
  else{
      navigate(ROUTE_LOGIN);
  }

  }




  async function handleUnFollowUser() {

    if(isLogin) {

    try {
      const response = await UnFollowApi.doUnFollow(`/user/${channelName}/unfollow`);
      if (response.error) {
        console.log(response.error);
        // setResponseError(response.error);
      } else {
        console.log(response.result);
        setUnFollow(response.result);
      }
    } catch (error) {
      console.error(error);
    }

  }
  else{
      navigate(ROUTE_LOGIN);
  }

  }



  



  async function handleGetFollowings() {

    if(isLogin) {

    try {
      const response = await GetFollowingsApi.GetFollowing('/user/followings');
      if (response.error) {
        console.log(response.error);
        // setResponseError(response.error);
      } else {
        console.log(response.result);
        // setIsFollowing(response.result);
        const isFollowingChannel = response.result.some(item => item.name === channelName);
        setIsFollowing(isFollowingChannel);
        console.log(isFollowingChannel);

      }
    } catch (error) {
      console.error(error);
    }

  }
  
  }



useEffect( () =>{
if(isLogin)
{
  handleGetFollowings();

}

},[]);


useEffect( () =>{


  console.log(isFollowing);

  if((!isLogin || (!isFollowing&&!isMe)) && !isFollowing)
  {
    setButtonTitle(btnTitle.doingFollow);
  }
  if(isFollowing)
  {
    setButtonTitle(btnTitle.doingUnFollow);
  }
  
  },[isFollowing]);




  

  return (
    <ChannelInfoBarWrapper>
      <Grid container className="containerWrapper">
        <Grid item className="userInfo">
          <img
            className="userAvatar"
            src={data.user.avatar}
            alt="تصویر پروفایل"
          />
          <h2 className="channelName">{data.channel.name}</h2>

            <Button
              className="settingBtn"
              onClick={() => {
                if(isLogin)
                {
                  if(ButtonTitle===btnTitle.doingFollow){
                    handleFollowUser();
                  }
                  if(ButtonTitle===btnTitle.doingUnFollow){
                    handleUnFollowUser();
                  }
                  if(ButtonTitle===btnTitle.setting){
                    navigate(ROUTE_MY_PROFILE);
                  }

                }

                else{
                  navigate(ROUTE_LOGIN);

                }
               
                
              }
            }
            >
              <SettingIcon className="settingIcon" />
              {ButtonTitle}
            </Button>

          
          
        </Grid>

        <Grid item className="statistics">
          <div className="statisticLabel">
            <b>{data.channel.videos_count}</b>تعداد ویدیو ها
          </div>
          <div className="statisticLabel">
            <b>{data.channel.views_count}</b>تعداد بازدید ها
          </div>
        </Grid>
      </Grid>
    </ChannelInfoBarWrapper>
  );
}

export default memo(ChannelInfoBar);
