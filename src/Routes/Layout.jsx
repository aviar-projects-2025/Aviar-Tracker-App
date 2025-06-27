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
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
      // paddingLeft: isSidebarOpen ? '250px' : '80px',
      // paddingTop: '60px',
      // transition: 'padding-left 0.3s ease'
    }}>
      {/* <Header /> */}
      <Home isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div style={{ 
         flexGrow: 1,
        marginLeft: isSidebarOpen ? '250px' : '80px',
        transition: 'margin-left 0.3s ease',
        paddingTop: '60px', // Space for header
        position: 'relative',
    
      }}>
       {/* <Header /> */}
        <div style={{ padding: '20px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LayoutWithSidebar;