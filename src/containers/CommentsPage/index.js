/**
 *
 * CommentsPage
 *
 */

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import DashboardLayout from "../../layouts/DashboardLayout/dashboardLayout";
import Filters from "../../components/Filters";
import CommentList from "../../components/CommentList";

const FILTER_VALUES = {
  all: "همه دیدگاه ها",
  unAccepted: "دیدگاه های تایید نشده",
};

export function CommentsPage({}) {
  const [filter, setFilter] = useState("all");

  function handleFilterChange(value) {
    setFilter(value);
  }

  return (
    <DashboardLayout style={{ margin: "0px" }}>
      <Helmet>
        <title>نظرات</title>
        <meta name="description" content="نظرات" />
      </Helmet>

      <Filters
        values={FILTER_VALUES}
        defaultValue={filter}
        onChange={handleFilterChange}
      />

      <CommentList  filterValue={filter} />
    </DashboardLayout>
  );
}

export default CommentsPage;
