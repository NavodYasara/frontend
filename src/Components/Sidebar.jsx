import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = ({ userType }) => {
  
  const getSidebarMenu = (userType) => {
    switch (userType = 'userType') {
      case "admin":
        return (
          <>
            <NavLink exact to="/AdminDashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/UserManagement" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table"> User Management </CDBSidebarMenuItem>
            </NavLink>
          </>
        );
      case "caregiver":
        return (
          <>
            <NavLink exact to="/CaregiverDashboard" activeClassName="activeClicked"> 
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exactto="/CaregiverProfile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
          </>
        );
      case "caretaker":
        return (
          <>
            <NavLink exact to="/CaregiverDetail" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user"> Caregiver details </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Careplan" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table"> View CarePlans </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/CaretakerDashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns"> Your Profile </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Report" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Reports</CDBSidebarMenuItem>
            </NavLink>
          </>
        );
      case "manager":
        return (
          <>
            <NavLink exact to="/Layout" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table"> Layout </CDBSidebarMenuItem>
            </NavLink>  
            <NavLink exact to="/CreateCareplan" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table"> Create CarePlan </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/ManagerDashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sidebar-container">
      <div
        style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href className="text-decoration-none"style={{ color: "inherit" }}>
              Sidebar({userType})
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>{getSidebarMenu(userType)}</CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div style={{ padding: "20px 5px",}}>
              Sidebar Footer
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default Sidebar;
