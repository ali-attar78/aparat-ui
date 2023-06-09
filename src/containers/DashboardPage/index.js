/**
 *
 * DashboardPage
 *
 */

import React, { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout/dashboardLayout";

import StatisticsCards from "../StatisticsPage/StatisticsCards/StatisticsCards";
import LoadingWithText from "../../components/LoadingWithText";
import ErrorMessage from "../../components/ErrorMessage";
import getChannelStatisticsApi from "../../services/getChannelStatisticsApi/getChannelStatisticsApi";

import { Helmet } from "react-helmet";

export function DashboardPage({}) {
  const [statistics, setStatistics] = useState({});
  const getChannelStatistics = getChannelStatisticsApi();

  async function fetchStatistics() {
    try {
      const response = await getChannelStatistics.getChannelStatistics(
        90,
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
    fetchStatistics(90);
  }, []);

  return (
    <div>
      <Helmet>
        <title>داشبورد</title>
        <meta name="description" content="صفحه داشبورد" />
      </Helmet>

      <DashboardLayout>
        {!statistics && <LoadingWithText />}

        {statistics.error && (
          <ErrorMessage
            error={statistics.error}
            options={{ 404: "اطلاعات مورد نظر یافت نشد" }}
          />
        )}

        {statistics && (
          <>
            <StatisticsCards statistics={statistics} />
          </>
        )}
      </DashboardLayout>
    </div>
  );
}

export default DashboardPage;
