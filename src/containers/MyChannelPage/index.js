/**
 *
 * MyChannelPage
 *
 */

import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import GetChannelInfoApi from "../../services/GetChannelInfoApi/GetChannelInfoApi";

import DashboardLayout from "../../layouts/DashboardLayout/dashboardLayout";
import LoadingWithText from "../../components/LoadingWithText";

import ErrorMessage from "../../components/ErrorMessage";

import ChannelBanner from "./ChannelBanner/ChannelBanner";
import ChannelInfoBar from "./ChannelInfoBar/ChannelInfoBar";
import ChannelData from "./ChannelData/ChannelData";
import { useState } from "react";

export function MyChannelPage({ match, clearChannelInfo }) {
  const getChannelInfo = GetChannelInfoApi();
  const [channelInfo, setChannelInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseError, setResponseError] = useState(null);

  const { name } = useParams();

  async function fetchChannelInfo() {
    try {
      const response = await getChannelInfo.GetChannelInfo(`/channel/${name}`);
      if (response.error) {
        console.log(response.error);
        setResponseError(response.error);
      } else {
        console.log(response.result);
        setLoading(false);
        setChannelInfo(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchChannelInfo();
  }, []);

  return (
    <DashboardLayout showSidebar={false} fullWidth>
      <Helmet>
        <title>کانال من</title>
        <meta name="description" content="کانال من" />
      </Helmet>

      {console.log(channelInfo)}
      {loading && <LoadingWithText />}

      {channelInfo && (
        <>
          <ChannelBanner src={channelInfo.channel.banner} />
          <ChannelInfoBar data={channelInfo} />
          <ChannelData data={channelInfo} />
        </>
      )}

      {responseError && (
        <ErrorMessage
          error={channelInfo.error}
          options={{ 404: "اطلاعات کانال یافت نشد" }}
        />
      )}
    </DashboardLayout>
  );
}

export default MyChannelPage;
