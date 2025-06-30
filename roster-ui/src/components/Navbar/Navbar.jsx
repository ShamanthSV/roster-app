import React from 'react';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navbar" role="tablist" aria-label="Navigation Tabs">
      <button
        role="tab"
        aria-selected={activeTab === 'course'}
        className={`tab ${activeTab === 'course' ? 'active' : ''}`}
        onClick={() => setActiveTab('course')}
      >
        Course Settings
      </button>
      <button
        role="tab"
        aria-selected={activeTab === 'roster'}
        className={`tab ${activeTab === 'roster' ? 'active' : ''}`}
        onClick={() => setActiveTab('roster')}
      >
        Roster
      </button>
    </nav>
  );
};

export default Navbar;
