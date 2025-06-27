import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AdminDashboard,
  AdminEmployeAttendance,
  AdminEmployeEdit,
  EmployeAttendance,
  Login,
  ProfilePage,
  Projects,
  ProjectEmail,
  ProjectDefectList,
  Admin,
  List,
  Project,
  Defectsportal,
  DefectDatas,
  Product,
  ProjectUsers,
  Defect,
  DefectDetails,
  LeaveManagement,
  Client,
  Defects,
  EditScreen,
  EmployeeDashboard,
  EmployeeLayout,
  ForgetPassword,
  ChangePassword,
  OptScreen,
  PasswordLayout,
  ProjectStatuses,
  ProjectStatus,
  EmployeeId,
  WebcamCapture,
  // Home,
  LayoutWithSidebar,
} from "../Pages";
// import PasswordLayout from "../Pages/changePassword/Passwordlayout";

// spinner or Loader
const fallbackLoader = (
  <div className="center">
    <Spinner animation="border" variant="primary" />
  </div>
);

export default function Routers() {
  return (
    <Router>
      <Suspense fallback={fallbackLoader}>
        <ToastContainer 
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Admin routes */}
          <Route element={<Admin />}>
            <Route element={<LayoutWithSidebar />}>
              {/* All these routes will have sidebar */}
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/projects" element={<Projects />} />
              <Route path="project/list" element={<Project />} />
              <Route path="project/users/:name/:id" element={<ProjectUsers />} />
              <Route path="products" element={<Product />} />
              <Route path="project/defects" element={<Defects />} />
              <Route path="defect/:name/:id" element={<DefectDatas />} />
              <Route path="employee/Leave" element={<LeaveManagement />} />
              <Route path="project/defect" element={<List />} />
              <Route path="defect/detail/:id" element={<DefectDetails />} />
              <Route path="project/statuses" element={<ProjectStatuses />} />
              <Route path="project/status" element={<ProjectStatus />} />
              {/* <Route path="admin/home" element={<Home />} /> */}
            </Route>
            
            {/* These admin routes won't have sidebar */}
            <Route path="admin-email" element={<ProjectEmail />} />
            <Route path="employee/attendance/admin" element={<AdminEmployeAttendance />} />
          </Route>

          {/* Client routes */}
          <Route element={<Client />}>
            <Route path="project/defects/list" element={<List />} />
            <Route path="defect/details/:id" element={<DefectDetails />} />
            <Route path="defects-portal" element={<Defectsportal />} />
            <Route path="edit" element={<EditScreen />} />
            <Route path="edit/:name/:id" element={<DefectDatas />} />
          </Route>

          {/* Employee routes */}
          <Route element={<EmployeeLayout />}>
            <Route path="employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="edit/profile" element={<EditScreen />} />
            <Route path="project" element={<Project />} />
            <Route path="defect" element={<List />} />
            <Route path="details/:id" element={<DefectDetails />} />
            <Route path=":name/:id" element={<DefectDatas />} />
          </Route>

          {/* Auth routes */}
          <Route element={<PasswordLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="forgot/password" element={<ForgetPassword />} />
            <Route path="change/password" element={<ChangePassword />} />
          </Route>
          {/* Miscellaneous routes */}
          <Route path="profile/view" element={<ProfilePage />} />
          <Route path="admin/to/employe/edit" element={<AdminEmployeEdit />} />
          <Route path="project" element={<ProjectDefectList />} />
          <Route path="EmployeeId/:id" element={<EmployeeId />} />
          <Route path="webcam" element={<WebcamCapture />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
