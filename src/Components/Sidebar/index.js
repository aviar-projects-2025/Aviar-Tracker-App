import React from "react";
import Aviar from "../Header/aviar.png";
import "../../css/sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-bootstrap";
const Sidebar = ({ onClick, active, value, props, openSideBar }) => {
    const open = openSideBar;
    const state ="open"

  return (
    <div>
      <div className={`${active ? "sidebar" : "sidebar active"}`}>
        <div className="logo-content">
          <div className="logo d-flex justify-content-start">
            <img src={Aviar} width={"700%"} className="mx-5" />
            {active === true ? (
            <FontAwesomeIcon
              icon={faBars}
              size="1x"
              onClick={() => {
                onClick(!active);
              }}
              className="menu-button "
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              onClick={() => {
                onClick(!active);
              }}
              className="menu-button "
            />
          )}
          </div>
        </div>
        <div className="nav-list  mx-2">
          <div className="menu-list mt-3">
            <NavLink activeClassName="main-nav-active">
              <FontAwesomeIcon
                icon={faUser}
                size="1x"
                title="Users"
                className="menu-icon"
              />
              <span className="mx-3">Module</span>
            </NavLink >
          </div>
          <div className="menu-list">
            <NavLink activeClassName="main-nav-active">
              <FontAwesomeIcon
                icon={faUser}
                size="1x"
                title="Users"
                className="menu-icon"
              />
              <span className="mx-3">Module</span>
            </NavLink>
          </div>
          <div className="menu-list ">
            <NavLink activeClassName="main-nav-active">
              <FontAwesomeIcon
                icon={faUser}
                size="1x"
                title="Users"
                className="menu-icon"
              />
              <span className="mx-3">Module</span>
            </NavLink>
          </div>
          <div className="menu-list">
            <NavLink activeClassName="main-nav-active">
            <FontAwesomeIcon
              icon={faUser}
              size="3x"
              title="Users"
              className="menu-icon"
            />
            <span className="mx-3">Module</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
