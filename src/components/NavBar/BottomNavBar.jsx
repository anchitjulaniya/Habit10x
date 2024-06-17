import React from "react";
import "./BottomNavBar.css";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AllInboxIcon from "@mui/icons-material/AllInbox";

const BottomNavBar = () => {
  return (
    <nav className="bottom-nav">
      <ul>
        <li>
          <Link to="/dashboard" className="nav-link">
            <DashboardIcon className="icons" /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/setting" className="nav-link">
            <SettingsIcon className="icons" /> <span>Setting</span>
          </Link>
        </li>
        <li>
          <Link to="/resources" className="nav-link">
            <AllInboxIcon className="icons" /> <span>Resources</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNavBar;

