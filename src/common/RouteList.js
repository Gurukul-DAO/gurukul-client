import React from "react";
import { Route, Routes } from "react-router-dom";
import MyCreatedCourses from "../routes/MyCreatedCourses";
import Platform from "../routes/Platform";

export default function RouteList() {

  return (
    <Routes>
      <Route path="/" element={<Platform />}></Route>
      <Route path="my-created-courses" element={<MyCreatedCourses />} />
    </Routes>
  );
}
