import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default DefaultLayout;
