import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Blogs from "./containers/Blogs";
import LoginPage from "./containers/LoginPage/LoginPage";
import NotFoundPage from "./containers/NotFoundPage/notFoundPage";
import DashboardPage from "./containers/DashboardPage/dashboardPage";
import { UploadPage } from './containers/UploadPage/uploadPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="Login" element={<LoginPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
