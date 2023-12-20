import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../pages/Home/Home"));
const Browse = lazy(() => import("../pages/Products/Products"));

const RouterService = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Browse />} />
      </Routes>
    </>
  );
};

export default RouterService;
