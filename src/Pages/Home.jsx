import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faTasks, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import '../css/Home.css'

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
       document.body.classList.toggle('sidebar-open', !isSidebarOpen);
  };
    React.useEffect(() => {
    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, []);

  return (
       <div 
      className="bg-light menuesidebar" 
      style={{    
        borderRight: '1px solid #dee2e6',
        transition: 'width 0.3s ease', 
        height: '100vh',
        width: isSidebarOpen ? '250px' : '80px',
        position: 'fixed',
        left: 0,
        top: '65px', // Below header
        zIndex: 100,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div className="p-3" style={{ flexShrink: 0 }}>  
        <div style={{ 
          display: 'flex', 
          justifyContent: isSidebarOpen ? 'space-between' : 'center',
          alignItems: 'center'
        }}>
          {isSidebarOpen && (
            <h5 className="mb-0 menu-text nav-font-color">Menu</h5>
          )}
          <button 
            onClick={toggleSidebar}
            className="btn btn-link p-0"
            style={{ color: 'inherit' }}
          >
            <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>

      <nav 
        className="nav flex-column px-3" 
        style={{ 
          flexGrow: 1,
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <NavLink 
          to="/admin/dashboard" 
          className="nav-link py-2 rounded"
          style={({ isActive }) => ({ 
            display: 'flex', 
            alignItems: 'center',
            backgroundColor: isActive ? '#f0f0f0' : 'transparent',
            marginBottom: '4px'
          })}
        >
          <FontAwesomeIcon icon={faUsers} className={isSidebarOpen ? "me-2" : "mx-auto"} />
          {isSidebarOpen && <span>Users</span>}
        </NavLink>

        <NavLink 
          to="/project/list" 
          className="nav-link py-2 rounded"
          style={({ isActive }) => ({ 
            display: 'flex', 
            alignItems: 'center',
            backgroundColor: isActive ? '#f0f0f0' : 'transparent',
            marginBottom: '4px'
          })}
        >
          <FontAwesomeIcon icon={faTasks} className={isSidebarOpen ? "me-2" : "mx-auto"} />
          {isSidebarOpen && <span>Projects</span>}
        </NavLink>
      </nav>
    </div>
  )
}

export default Home;