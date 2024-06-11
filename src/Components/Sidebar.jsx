import React, { useEffect, useState } from "react";
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
    switch (userType) {
      case "admin":
        return (
          <>
            <NavLink exact to="/AdminDashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/ManageStaff" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">
                {" "}
                Manage Staff{" "}
              </CDBSidebarMenuItem>
            </NavLink>
          </>
        );
      case "caregiver":
        return (
          <div>
            <NavLink
              exact
              to="/CaregiverDashboard"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="columns">
                Your Caretakers 
              </CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink
              exact
              to="/CaregiverProfile"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="user">
                Caregiver Profile
              </CDBSidebarMenuItem>
            </NavLink> */}
          </div>
        );
      case "caretaker":
        return (
          <>
            <NavLink
              exact
              to="/CaretakerDashboard"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="user">
                Caretaker Dashboard{" "}
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/CtRequirement" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">
                {" "}
                Requirments{" "}
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/Feedback" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">
                {" "}
                Feedbacks{" "}
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/Report" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Reports</CDBSidebarMenuItem>
            </NavLink>
          </>
        );
      case "manager":
        return (
          <>
            <NavLink
              exact
              to="/ManagerDashboard"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/newTask" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">New Plan</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/waitingPlan" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">
                Assigned Plan
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Finalized" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">
                Finalized Plan
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/MReports" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">
                Reports
              </CDBSidebarMenuItem>
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
            <a
              href
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Sidebar({userType})
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>{getSidebarMenu(userType)}</CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div style={{ padding: "20px 5px" }}>Sidebar Footer</div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default Sidebar;
