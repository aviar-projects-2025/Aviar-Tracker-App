// LayoutWithSidebar.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Home from '../Pages/Home';
import Header from '../Components/Header';

function LayoutWithSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      paddingLeft: isSidebarOpen ? '250px' : '80px',
      paddingTop: '60px',
      transition: 'padding-left 0.3s ease'
    }}>
      {/* <Header /> */}
      <Home isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div style={{ 
        flexGrow: 1,
        padding: '20px',
        backgroundColor: '#f8f9fa'
      }}>
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutWithSidebar;