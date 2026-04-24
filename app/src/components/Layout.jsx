import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Users, UserRound, FlaskConical } from 'lucide-react';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <FlaskConical className="logo-icon" size={28} />
            <h2>apLIS</h2>
          </div>
          <p className="subtitle">Laboratório</p>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/pacientes" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Users size={20} />
            <span>Pacientes</span>
          </NavLink>
          
          <NavLink to="/medicos" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <UserRound size={20} />
            <span>Médicos</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-info">
            <span className="user-greeting">Olá, Administrador</span>
          </div>
        </header>
        
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
