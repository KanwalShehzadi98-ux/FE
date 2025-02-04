import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faChartLine, faDownload, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../Images/logo.png"; 
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate(); 

  const handleLogoClick = () => {
    navigate("/"); 
  };

  return (
    <div className="sidebar">
      <div className="logo" onClick={handleLogoClick}>
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li>
          <NavLink 
            to="/overview" 
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FontAwesomeIcon icon={faTachometerAlt} /> Overview
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/analytics" 
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FontAwesomeIcon icon={faChartLine} /> Analytics
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/download" 
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FontAwesomeIcon icon={faDownload} /> Download
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/project-info" 
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> Project Info
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
