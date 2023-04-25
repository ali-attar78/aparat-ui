import React from "react";
import { Helmet } from "react-helmet";
import DashboardLayout from "../../layouts/DashboardLayout/dashboardLayout";

const dashboardPage = () => {
  return (
    <div>
      <Helmet>
        <title>صفحه ورود آپارات</title>
        <meta name="dashboard" content="dashboard page" />
      </Helmet>

      <DashboardLayout>
        <h1>dashboard page</h1>
      </DashboardLayout>
    </div>
  );
};

export default dashboardPage;
