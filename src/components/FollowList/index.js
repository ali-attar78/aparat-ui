/**
 *
 * FollowList
 *
 */

import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Grid } from "@mui/material";

import NoItemInList from "../NoItemInList";
import FollowItem from "../FollowItem";

import getFollowingService from "../../services/GetFollowingApi/GetFollowingApi";
import getFollowerService from "../../services/GetFollowerApi/GetFollowerApi";
import { FOLLOW_TYPE_FOLLOWINGS, FOLLOW_TYPE_FOLLOWERS } from "../../constans";

const FollowListWrapper = styled(Grid)`
  display: flex;
  align-content: space-around;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

function FollowList({ filterValue }) {
  const [thisChannels, setChannels] = useState(null);
  const getFollowingApi = getFollowingService();
  const getFollowerApi = getFollowerService();
  const [mergedList, setMergedList] = useState([]);


  useEffect(() => {
    async function fetchChannels() {
      const followingResponse = await getFollowingApi.GetFollowing(
        "/user/followings"
      );
      const followerResponse = await getFollowerApi.GetFollower(
        "/user/followers"
      );

      if (followingResponse.result && followerResponse.result) {
        const followingList = followingResponse.result.map((item) => {
          return { ...item, type: FOLLOW_TYPE_FOLLOWINGS };
        });
        const followerList = followerResponse.result.map((item) => {
          return { ...item, type: FOLLOW_TYPE_FOLLOWERS };
        });

        const mergeList = [...followingList, ...followerList];

        const bilateralList = mergeList.map((item) => ({
          ...item,
          bilateral: mergeList.filter((i) => i.id === item.id).length === 2,
        }));
        setMergedList(bilateralList)

              }
    }
    fetchChannels();
  }, [filterValue]);



  useEffect(() => {
    if (mergedList.length > 0) {
      const data = mergedList.filter(
        (item) =>
          item.type === filterValue ||
          (filterValue === FOLLOW_TYPE_FOLLOWINGS &&
            item.type === FOLLOW_TYPE_FOLLOWERS &&
            item.followed)
      );
  
      const uniqueData = [...new Set(data.map((x) => x.id))].map((id) => {
        return data.find((item) => item.id === id);
      });
  
      setChannels(uniqueData);
    }
  }, [mergedList, filterValue]);





  return (
    <FollowListWrapper>
      {!!thisChannels &&
        !!thisChannels.length &&
        thisChannels.map((channel) => (
          <FollowItem
            key={channel.id + channel.name + channel.type}
            item={channel}
          />
        ))}

      {!(thisChannels && thisChannels.length) && (
        <NoItemInList title="هیچ موردی یافت نشد" />
      )}
    </FollowListWrapper>
  );
}

FollowList.propTypes = {
  channels: PropTypes.array,
};

export default memo(FollowList);
