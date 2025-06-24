import React from "react";
import { Outlet } from "react-router-dom";
import  EmployeHeader  from "./EmployeeHeader";

function EmployeeLayout() {
  return (
    <>
      <EmployeHeader />
      <Outlet />
    </>
  );
}

export default EmployeeLayout;
