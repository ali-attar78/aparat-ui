import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Blogs from "./containers/Blogs";
import LoginPage from "./containers/LoginPage/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="Login" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  );
}