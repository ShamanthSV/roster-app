import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header-wrapper" role="banner">
      <div className="header-container">
        <div className="header-text">
          <div className="header-title"><u>My Courses</u> &gt; Manage course</div>
          <div className="header-subtitle">Galvez's Trigonometry and Algebra</div>
        </div>
        <button className="invite-button" aria-label="Invite to Course">
          Invite to Course
        </button>
      </div>
    </header>
  );
};

export default Header;
