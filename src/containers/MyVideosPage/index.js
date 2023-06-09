import React, { useEffect, useState } from "react";

import { Helmet } from "react-helmet";

import DashboardLayout from "../../layouts/DashboardLayout/dashboardLayout";
import VideoList from "../../components/VideoList";

import Filters from "../../components/Filters";

function MyVideosPage() {
  const FILTER_VALUES = {
    all: "همه",
    unpublished: "منتشر نشده",
    playlist: "لیست پخش",
    republish: "بازنشر شده",
  };

  const [filter, setFilter] = useState("all");

  return (
    <DashboardLayout style={{ margin: "0px" }}>
      <Helmet>
        <title>ویدیو های من</title>
        <meta name="description" content="ویدیو های من" />
      </Helmet>

      <Filters
        values={FILTER_VALUES}
        defaultValue={filter}
        onChange={setFilter}
      />
      <VideoList filterValue={filter} />
    </DashboardLayout>
  );
}

export default MyVideosPage;
