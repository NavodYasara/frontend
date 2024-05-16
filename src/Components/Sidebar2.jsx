
import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar2(Caretaker)
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/CaretakerDashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Your Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Careplan " activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">View CarePlans</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/CaregiverDetail" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Caregiver details</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Report" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Reports</CDBSidebarMenuItem>
            </NavLink>
             <NavLink exact to="/Payment" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">Payment</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Payment" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">/Payments</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;