import React from "react";
import { Outlet } from "react-router-dom";
import  PasswordHeader  from "./PasswordHeader";

function PasswordLayout() {
  return (
    <>
      <PasswordHeader />
      <Outlet />
    </>
  );
}

export default PasswordLayout ;
