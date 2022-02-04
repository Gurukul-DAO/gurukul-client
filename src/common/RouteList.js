import React from "react";
import { Route, Routes } from "react-router-dom";
import Platform from "../routes/Platform";

export default function RouteList() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Platform />}></Route>
      </Routes>
    </div>
  );
}
