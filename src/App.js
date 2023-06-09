import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blogs from "./containers/Blogs";
import LoginPage from "./containers/LoginPage/LoginPage";
import NotFoundPage from "./containers/NotFoundPage/notFoundPage";
import DashboardPage from "./containers/DashboardPage";
import { UploadPage } from './containers/UploadPage/uploadPage';
import * as routes from './routes';
import MyVideosPage from './containers/MyVideosPage/index';
import { VideoUpdatePage } from './containers/VideoUpdatePage/index';
import { VideoShowPage } from './containers/VideoShowPage/index';
import { FollowingChannelsPage } from './containers/FollowingChannelsPage/index';
import { CommentsPage } from './containers/CommentsPage/index';
import { StatisticsPage } from './containers/StatisticsPage/index';
import { MyChannelPage } from './containers/MyChannelPage/index';
import { UserProfilePage } from './containers/UserProfilePage/index';
import HomePage from './containers/HomePage/index';
import { VideoViewPage } from './containers/VideoViewPage/index';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path={routes.ROUTE_LOGIN} element={<LoginPage />} />
        <Route path={routes.ROUTE_UPLOAD} element={<UploadPage />} />
        <Route path={routes.ROUTE_DASHBOARD} element={<DashboardPage />} />
        <Route path={routes.ROUTE_MY_VIDEOS} element={<MyVideosPage />} />   
        <Route path={routes.ROUTE_VIDEO_UPDATE} element={<VideoUpdatePage />} />
        <Route path={routes.ROUTE_VIDEO_SHOW} element={<VideoShowPage />} />
        <Route path={routes.ROUTE_FOLLOWED_CHANNELS} element={<FollowingChannelsPage />} />
        <Route path={routes.ROUTE_COMMENTS} element={<CommentsPage />} />
        <Route path={routes.ROUTE_STATISTICS} element={<StatisticsPage />} />
        <Route path={routes.ROUTE_MY_CHANNEL} element={<MyChannelPage />} />

        <Route path={routes.ROUTE_MY_PROFILE} element={<UserProfilePage />} />
        <Route path={routes.ROUTE_MY_PROFILE_BANNER} element={<UserProfilePage />} />
        <Route path={routes.ROUTE_MY_PROFILE_CATEGORIES} element={<UserProfilePage />} />
        <Route path={routes.ROUTE_MY_PROFILE_UNREGISTER} element={<UserProfilePage />} />
        <Route path={routes.ROUTE_VIDEO_VIEW} element={<VideoViewPage />} />






        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
