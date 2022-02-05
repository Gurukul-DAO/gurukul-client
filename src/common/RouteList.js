import React from "react";
import { Route, Routes } from "react-router-dom";
import SideNav from "../components/SideNav";
import Dashboard from "../routes/Dashboard";
import MyCreatedCourses from "../routes/MyCreatedCourses";
import Platform from "../routes/Platform";

export default function RouteList() {

  return (
    <Routes>
      <Route path="/" element={<Platform />}></Route>
      <Route path="my-created-courses" element={<MyCreatedCourses />} />
      <Route path="dashboard" element={<div><SideNav dashboard/><Dashboard /></div>} />
    </Routes>
  );
}
