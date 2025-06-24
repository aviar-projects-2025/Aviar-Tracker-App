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
          {/* <PublicLayout exact name="LandingPage" path="/kharpi" component={LandingPage} />
          <Route exact path="/" component={Home}>
            <Redirect to="/kharpi" />
          </Route>{" "} */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* <Route path="/" ><redirect ></redirect> </Route> */}
          <Route path="" exact element={<Admin />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin-email" element={<ProjectEmail />} />
            <Route path="/admin/projects" element={<Projects />} />
            <Route path="/project/list" element={<Project />} />
            <Route path="/project/users/:name/:id" element={<ProjectUsers />} />
            <Route path="/products" element={<Product />} />
            <Route path="/project/defects" element={<Defects />} />
            <Route path="/defect/:name/:id" element={<DefectDatas />} />
            <Route path="/edit/screen" element={<EditScreen />} />
            <Route path="/employee/Leave" element={<LeaveManagement />} />
            <Route path="/project/defect" element={<List />} />
            <Route path="/defect/detail/:id" element={<DefectDetails />} />
            <Route path="/project/statuses" element={<ProjectStatuses />} />
            <Route path="/project/status" element={<ProjectStatus />} />
            <Route path="/employee/attendance/admin" element={<AdminEmployeAttendance />} />
          </Route>

          <Route path="" exact element={<Client />}>
            <Route path="/project/defects/list" element={<List />} />
            <Route path="/defect/details/:id" element={<DefectDetails />} />
            <Route path="/defects-portal" element={<Defectsportal />} />
            <Route path="/edit" element={<EditScreen />} />
            <Route path="/edit/:name/:id" element={<DefectDatas />} />
          </Route>

          <Route exact element={<EmployeeLayout />}>
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="/edit/profile" element={<EditScreen />} />
            <Route path="/project" element={<Project />} />
            <Route path="/defect" element={<List />} />
            <Route path="/details/:id" element={<DefectDetails />} />
            <Route path="/:name/:id" element={<DefectDatas />} />
          </Route>
          <Route exact element={<PasswordLayout />}>
            <Route exact path="/login" element={<Login />} />
            <Route path="/forgot/password" element={<ForgetPassword />} />
            <Route path="/change/password" element={<ChangePassword />} />
          </Route>

          <Route path="/profile/view" element={<ProfilePage />} />
          <Route path="/admin/to/employe/edit" element={<AdminEmployeEdit />} />
          <Route path="/project" element={<ProjectDefectList />} />
          <Route path="/EmployeeId/:id" element={<EmployeeId />} />
          <Route path="/webcam" element={<WebcamCapture />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
