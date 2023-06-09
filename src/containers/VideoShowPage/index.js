/**
 *
 * VideoShowPage
 *
 */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import moment from "moment";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout/dashboardLayout";
import getStatisticsApi from "../../services/getVideoStatisticsApi/getVideoStatisticsApi";
import Loading from "../../components/LoadingWithText";

import LoadingWithText from "../../components/LoadingWithText";
import VideoDetail from "./VideoDetail/VideoDetail";
import VideoStatisticsCards from "./VideoStatisticsCards/VideoStatisticsCards";
import VideoStatisticsChart from "./VideoStatisticsChart/VideoStatisticsChart";

const Wrapper = styled.div`
  margin: 2em auto;
  max-width: 100%;
`;

export function VideoShowPage({}) {
  const getStatisticsService = getStatisticsApi();
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [range, setRange] = useState(7);

  const location = useLocation();
  const video = location.state;
  console.log(video);

  async function getStatistics() {
    try {
      const response = await getStatisticsService.getVideoStatistics(
        `/video/${video.slug}/statistics`,
        range
      );
      setStatistics(response);
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStatistics();
  }, [range]);

  function todayViews() {
    let result = 0;

    if (statistics.result && statistics.result.views) {
      Object.entries(statistics.result.views).forEach(([dt, value]) => {
        if (!moment().startOf("day").diff(dt, "days")) {
          result += value;
        }
      });
    }

    return result;
  }

  return (
    // change it

    <DashboardLayout >
      <Helmet>
        <title>نمایش ویدیو</title>
        <meta name="description" content="نمایش ویدیو" />
      </Helmet>

      <Wrapper>
        {isLoading ? (
          <Loading />
        ) : video ? (
          <>
            <VideoDetail video={video} />
            <VideoStatisticsCards video={video} todayViews={todayViews()} />

            {statistics.result && (
              <VideoStatisticsChart
                statistics={statistics.result.views}
                range={range}
                disabled={!!statistics.slug}
                handleRangeChange={setRange}
              />
            )}
          </>
        ) : (
          <LoadingWithText />
        )}
      </Wrapper>
    </DashboardLayout>
  );
}

VideoShowPage.propTypes = {};

export default VideoShowPage;
