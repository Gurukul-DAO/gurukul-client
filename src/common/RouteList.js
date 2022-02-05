import React from "react";
import { Route, Routes } from "react-router-dom";
import SideNav from "../components/SideNav";
import Dashboard from "../routes/Dashboard";
import MyCreatedCourses from "../routes/MyCreatedCourses";
import Platform from "../routes/Platform";
import MyNFTs from "../routes/MyNFTs";

export default function RouteList() {

  return (
    <Routes>
      <Route path="/" element={<Platform />}></Route>
      <Route path="my-created-courses" element={<MyCreatedCourses />} />
      <Route path="dashboard" element={<div><SideNav dashboard/><Dashboard /></div>} />
      <Route path="nfts" element={<div><SideNav dashboard/><MyNFTs /></div>} />
    </Routes>
  );
}
