import React from "react";
import Routers from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AppContextProvider } from "./Hooks/AppContext";

function App() {
  return (
    <>
      <AppContextProvider>
        <Routers />
      </AppContextProvider>
    </>
  );
}

export default App;
// import React, { useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Spinner from "react-bootstrap/Spinner";
// import { Suspense, lazy } from "react";

// const LoginPage = lazy(() => import("./Components/Login"));
// const AdminDashboard = lazy(() => import("./Components/AdminDashboard"));
// const ProfileView = lazy(() => import("./Components/Profileview"));
// const EmployeEdit = lazy(() => import("./Components/AdminToEmployeeEdit"));
// const EmployeeAttendace = lazy(() => import("./Components/EmployeeAttendanceAdmin"));
// const EmployeeDashboard = lazy(() => import("./EmployeeDashboard"));

// // spinner or Loader
// const fallbackLoader = (
//   <div className="center">
//     <Spinner animation="border" variant="primary" />
//   </div>
// );

// function App() {
//   return (
//     <>
//       <Router>
//         <Suspense fallback={fallbackLoader}>
//           <Routes>
//             <Route exact path="/" element={<LoginPage />} />
//             <Route path="/admin/dashboard" element={<AdminDashboard />} />
//             <Route path="/profile/view" element={<ProfileView />} />
//             <Route path="/admin/to/employe/edit" element={<EmployeEdit />} />
//             <Route path="/employee/attendance/admin" element={<EmployeeAttendace />} />
//             <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
//           </Routes>
//         </Suspense>
//       </Router>
//     </>
//   );
// }

// export default App;
