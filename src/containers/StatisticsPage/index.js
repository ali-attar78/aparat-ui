/**
 *
 * StatisticsPage
 *
 */

import React, { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout/dashboardLayout";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingWithText from "../../components/LoadingWithText";
import { useNavigate } from "react-router-dom";

import StatisticsCards from "./StatisticsCards/StatisticsCards";
import StatisticsChart from "./StatisticsChart/StatisticsChart";
import StatisticsTopVideos from "./StatisticsTopVideos/StatisticsTopVideos";
import getChannelStatisticsApi from "../../services/getChannelStatisticsApi/getChannelStatisticsApi";
import { Helmet } from "react-helmet";

export function StatisticsPage({}) {
  const [range, setRange] = useState(7);

  const [statistics, setStatistics] = useState({});
  const navigate = useNavigate();

  const getChannelStatistics = getChannelStatisticsApi();

  async function fetchStatistics() {
    try {
      const response = await getChannelStatistics.getChannelStatistics(
        range,
        "/channel/statistics"
      );
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response.result);
        setStatistics(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchStatistics();
  }, [range]);

  function handleVideoClick(slug) {
    const video = statistics.top_videos.find((v) => v.slug === slug);
    if (video) {
      console.log(video);
      navigate(`/video/${slug}`, { state: video });
    }
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title>آمار بازدید</title>
        <meta name="description" content="آمار بازدید کانال" />
      </Helmet>

      {!statistics && <LoadingWithText />}

      {statistics.error && (
        <ErrorMessage
          error={statistics.error}
          options={{ 404: "ویدیو مورد نظر یافت نشد" }}
        />
      )}

      {statistics.views && (
        <>
          <StatisticsCards  />
          <StatisticsChart
            statistics={statistics.views}
            range={range}
            handleRangeChange={setRange}
          />

          <StatisticsTopVideos
            statistics={statistics}
            onVideoClick={handleVideoClick}
          />
        </>
      )}
    </DashboardLayout>
  );
}

export default StatisticsPage;
