/**
 *
 * FollowItem
 *
 */

import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import followChannelService from "../../services/FollowApi/FollowApi";
import unFollowChannelService from "../../services/UnFollowApi/UnFollowApi";
import { FOLLOW_TYPE_FOLLOWINGS } from "../../constans";

const FollowItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 190px;
  position: relative;
  margin-bottom: 2em;
  padding: 0.5em;

  > .card {
    background: #fff;
    box-shadow: rgb(221 208 208) 0px 0px 2px 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.5em;

    > img {
      display: block;
      width: 80px;
      height: 80px;
      border-radius: 100%;
    }

    > b {
      display: block;
      width: 100%;
      margin: 0.5em;
      text-align: center;
    }

    > .channelDetail > span {
      display: inline-block;
      margin: 0.5em;
      text-align: center;
      font-size: 13px;
    }

    > .followBtn {
      border-radius: 2em;
      margin-top: 0.5em;

      .icon {
        font-size: 1.2em;
      }
    }
  }
`;

function FollowItem({ item }) {
  const followChannelApi = followChannelService();
  const unFollowChannelApi = unFollowChannelService();
  const [isFollowed, setIsFollowed] = useState(null);
  const [unFollow, setUnFollow] = useState(false);

  useEffect(() => {
    setIsFollowed(item.type === FOLLOW_TYPE_FOLLOWINGS);
  }, [item.type]);

  async function doFollowChannel() {
    try {
      const response = await followChannelApi.doFollow(
        `/user/${item.name}/follow`
      );
      if (response.result) {
        setIsFollowed(true);
        console.log(response.result);
      }
      if (response.error) {
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function doUnFollowChannel() {
    try {
      const response = await unFollowChannelApi.doUnFollow(
        `/user/${item.name}/unfollow`
      );
      if (response.result) {
        setIsFollowed(false);
        setUnFollow(true);

        console.log(response.result);
      }
      if (response.error) {
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const CAN_FOLLOW =
    (!isFollowed && !item.bilateral) ||
    (item.type === FOLLOW_TYPE_FOLLOWINGS && !isFollowed && item.bilateral) ||
    (unFollow && !isFollowed);
  const CAN_UNFOLLOW =
    (isFollowed && !item.bilateral) ||
    (item.type !== FOLLOW_TYPE_FOLLOWINGS && item.bilateral && !unFollow) ||
    (isFollowed && item.bilateral);

  return (
    <FollowItemWrapper>
      <div className="card">
        <img src={item.avatar} alt="تصویر کانال" />
        <b>{item.name}</b>
        <div className="channelDetail">
          <span>{item.followers_count} دنبال کننده</span> .{" "}
          <span>{item.videos_count} ویدیو</span>
        </div>

        {CAN_FOLLOW ? (
          <Button
            style={{ color: "#fff" }}
            color="danger"
            className="followBtn"
            variant="contained"
            onClick={doFollowChannel}
          >
            <AddIcon className="icon" />
            دنبال کردن
          </Button>
        ) : null}

        {CAN_UNFOLLOW ? (
          <Button
            color="gray"
            className="followBtn"
            variant="outlined"
            onClick={doUnFollowChannel}
          >
            <CheckIcon className="icon" />
            دنبال شده
          </Button>
        ) : null}
      </div>
    </FollowItemWrapper>
  );
}

export default memo(FollowItem);
