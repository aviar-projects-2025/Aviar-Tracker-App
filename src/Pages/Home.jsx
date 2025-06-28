import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Aviar from "../Components/Header/aviar.png";
import "../css/Home.css";
import {
  faUsers,
  faTasks,
  faBars,
  faTimes,
  faBug, 
  faCircleChevronLeft,
  faSignal,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Home.css";
import { is } from "date-fns/locale";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const[onClick, setOnClick] = useState(false);
const open = isSidebarOpen;
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle("sidebar-open", !isSidebarOpen);
  };
  React.useEffect((onClick) => {
    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, []);

  return (
    <div 
      className="bg-light menuesidebar"
     
      style={{
        
        borderRight: " solid #dee2e6",
        borderLeft: " solid #dee2e6",
        borderTop: "25px solid #dee2e6",
        borderBottom: "70px solid #dee2e6",
        borderRadius: "20px",
        transition: "width 0.3s ease",
        height: "100vh",
      marginBottom: "0px",
        marginTop: "0px",
        width: isSidebarOpen ? "250px" : "80px",
        position: "fixed",
        left: 0,
        top: "65px",
        zIndex: 100,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="p-3" style={{ flexShrink: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: isSidebarOpen ? "space-between" : "center",
            alignItems: "center",
                 gap: "10px",
          }}
        >
            {isSidebarOpen ? (
            <>
              <div className="logo-content"style={{ display: "flex", alignItems: "center", gap: "10px"}} >
                <img 
                  src={Aviar} 
                  width="80%" 
                  height="100%" 
                  marginTop="10px"
                  style={{ borderRadius: "50%" }}
                  alt="Avatar"
                />
              </div>
              <button
                onClick={toggleSidebar}
                className="btn btn-link p-0"
                style={{ color: "inherit" }}
              >
                <FontAwesomeIcon icon={faCircleChevronLeft} />
              </button>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="btn btn-link p-0"
              style={{ color: "inherit" }}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          )}
        </div>
      </div>

      <nav
        className="nav flex-column px-3"
        style={{
          flexGrow: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <NavLink
          to="/admin/dashboard"
          className="nav-link py-2 rounded nav-font-color menu-text"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            backgroundColor: isActive ? "#f0f0f0" : "transparent",
            marginBottom: "4px",
          })}
        >
          <FontAwesomeIcon
            icon={faUsers}
            className={isSidebarOpen ? "me-2" : "mx-auto"}
            style={{ width: "20px" }} // Consistent icon width
          />
          {isSidebarOpen && <span>Users</span>}
        </NavLink>

        <NavLink
          to="/project/list"
          className="nav-link py-2 rounded nav-font-color menu-text"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            backgroundColor: isActive ? "#f0f0f0" : "transparent",
            marginBottom: "4px",
          })}
        >
          <FontAwesomeIcon
            icon={faTasks}
            className={isSidebarOpen ? "me-2" : "mx-auto"}
          />
          {isSidebarOpen && <span>Projects</span>}
        </NavLink>
        
        <NavLink 
          to="/project/defects" 
          className="nav-link py-2 rounded nav-font-color menu-text"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            backgroundColor: isActive ? "#f0f0f0" : "transparent",
            marginBottom: "4px",
          })}
        >
          <FontAwesomeIcon
            icon={faBug}
            className={isSidebarOpen ? "me-2" : "mx-auto"}
          />
          {isSidebarOpen && <span>Defects</span>}
        </NavLink>
        
        <NavLink 
          to="/project/statuses" 
          className="nav-link py-2 rounded nav-font-color menu-text"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            backgroundColor: isActive ? "#f0f0f0" : "transparent",
            marginBottom: "4px",
          })}
        >
          <FontAwesomeIcon
            icon={faSignal}
            className={isSidebarOpen ? "me-2" : "mx-auto"}
          />
          {isSidebarOpen && <span>Project Status</span>}
        </NavLink>
      </nav>
    </div>
  );
}

export default Home;