import React from "react";
import { Route, Routes } from "react-router-dom";
import SideNav from "../components/SideNav";
import Dashboard from "../routes/Dashboard";
import MyCreatedCourses from "../routes/MyCreatedCourses";
import Platform from "../routes/Platform";
import MyNFTs from "../routes/MyNFTs";
import MyTokens from "../routes/MyTokens";

export default function RouteList() {

  return (
    <Routes>
      <Route path="/" element={<Platform />}></Route>
      <Route path="my-created-courses" element={<div><SideNav dashboard/><MyCreatedCourses /></div>} />
      <Route path="dashboard" element={<div><SideNav dashboard/><Dashboard /></div>} />
      <Route path="nfts" element={<div><SideNav dashboard/><MyNFTs /></div>} />
      <Route path="tokens" element={<div><SideNav dashboard/><MyTokens /></div>} />
    </Routes>
  );
}
