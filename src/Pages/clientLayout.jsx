import React from "react";
import { Outlet } from "react-router-dom";
import ClientHeader from "../Components/ClientHeader";

function clientLayout() {
  return (
    <div>
      <ClientHeader />
      <Outlet />
    </div>
  );
}

export default clientLayout;
