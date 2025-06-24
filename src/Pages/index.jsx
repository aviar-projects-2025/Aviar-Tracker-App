import { lazy } from "react";

const Login = lazy(() => import("./Login"));
const AdminDashboard = lazy(() => import("./AdminDashboard"));
const ProfilePage = lazy(() => import("./ProfilePage"));
const AdminEmployeEdit = lazy(() => import("./AdminEmployeEdit"));
const AdminEmployeAttendance = lazy(() => import("./AdminEmployeAttendance"));
const EmployeAttendance = lazy(() => import("./EmployeDashboard"));
const LeaveManagement = lazy(() => import("./LeaveManagement"));
const Projects = lazy(() => import("./Projects"));
const ProjectEmail = lazy(() => import("./ProjectEmail"));
const ProjectDefectList = lazy(() => import("./ProjectDefectList"));
const Project = lazy(() => import("./Project"));
const Defect = lazy(() => import("./Defect"));
const List = lazy(() => import("./DefectLists"));
const DefectDetails = lazy(() => import("./DefectDetails"));
const Defectsportal = lazy(() => import("./defectportal"));
const Admin = lazy(() => import("./DefaultLayout"));
const Client = lazy(() => import("./clientLayout"));
const Product = lazy(() => import("./Product"));
const ProjectUsers = lazy(() => import("./ProjectUsers"));
const Defects = lazy(() => import("./Defects"));
const EditScreen = lazy(() => import("./EditProfile"));
const EmployeeDashboard = lazy(() => import("./Employe/Employee"));
const EmployeHeader = lazy(() => import("./Employe/EmployeeHeader"));
const EmployeeLayout = lazy(() => import("./Employe/EmployeeLayout"));
const PasswordLayout = lazy(() => import("./changePassword/PasswordLayout"));
const DefectDatas = lazy(() => import("./DefectDatas"));
const ForgetPassword = lazy(() => import("./changePassword/ForgetPassword"));
const ChangePassword = lazy(() => import("./changePassword/ChangePassword"));
const Otp = lazy(() => import("./Projects"));
const PasswordHeader = lazy(() => import("./changePassword/PasswordHeader"));
const ProjectStatuses = lazy(() => import("./ProjectStatuses"));
const ProjectStatus = lazy(() => import("./ProjectStatus"));
const EmployeeId = lazy(() => import("./EmployeeId"));
const WebcamCapture = lazy(() => import("./webcam"));

export {
  Login,
  AdminDashboard,
  ProfilePage,
  AdminEmployeEdit,
  AdminEmployeAttendance,
  EmployeAttendance,
  LeaveManagement,
  Projects,
  Project,
  Defect,
  DefectDetails,
  Defectsportal,
  DefectDatas,
  List,
  ProjectEmail,
  ProjectDefectList,
  ProjectUsers,
  Admin,
  Client,
  Product,
  Defects,
  EditScreen,
  EmployeeDashboard,
  EmployeHeader,
  EmployeeLayout,
  ForgetPassword,
  ChangePassword,
  Otp,
  PasswordHeader,
  PasswordLayout,
  ProjectStatuses,
  ProjectStatus,
  EmployeeId,
  WebcamCapture,
};
