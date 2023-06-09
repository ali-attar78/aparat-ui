/**
 *
 * FollowingChannelsPage
 *
 */

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FOLLOW_TYPE_FOLLOWINGS, FOLLOW_TYPE_FOLLOWERS } from "../../constans";

import DashboardLayout from "../../layouts/DashboardLayout/dashboardLayout";
import FollowList from "../../components/FollowList";
// import _ from 'underscore';

import Filters from "../../components/Filters";

export function FollowingChannelsPage({}) {
  const FILTER_VALUES = {
    [FOLLOW_TYPE_FOLLOWINGS]: "کانال های دنبال شده",
    [FOLLOW_TYPE_FOLLOWERS]: "دنبال کنندگان شما",
  };

  const [filter, setFilter] = useState(FOLLOW_TYPE_FOLLOWINGS);

  return (
    <DashboardLayout style={{ margin: "0px" }}>
      <Helmet>
        <title>کانالهای دنبال شده</title>
        <meta name="description" content="کانالهای دنبال شده" />
      </Helmet>

      <Filters
        values={FILTER_VALUES}
        defaultValue={filter}
        onChange={setFilter}
      />
      <FollowList filterValue={filter} />
    </DashboardLayout>
  );
}

export default FollowingChannelsPage;
