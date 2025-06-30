import React, { useState } from 'react';
import './RosterFooter.css';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

const roleFilters = {
  'Active Students': ['TA', 'Inactive'],
  'Inactive Students': ['Active'],
  'Section Instructor': ['Remove','Inactive'],
  'Teaching Assistants': ['Remove', 'Inactive'],
};

const RosterFooter = ({ selectedRows, selectedRole, onSave, allRows }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleSave = () => {
    setShowMessage(true);
    setTimeout(() => {
      onSave();
      setShowMessage(false);
    }, 1500);
  };

  const filters = roleFilters[selectedRole] || [];
  const isSelection = selectedRows.length > 0;

  const visibleCount = allRows.filter((row) =>
    selectedRole === 'All Members' ? true : row.role === selectedRole
  ).length;

  return (
    <div
      className="roster-footer"
      role="region"
      aria-label="Roster footer actions"
      aria-live="polite"
    >
      <div className="left">{selectedRows.length} of {visibleCount} selected</div>

      <div className="middle">
        {filters.map((label) => (
          <label key={label} className="filter-option">
            <Checkbox
              disabled={!isSelection}
              sx={{
                color: '#006F8F',
                '&.Mui-checked': { color: '#006F8F' },
              }}
            />
            {label}
          </label>
        ))}
      </div>

      <div className="right">
        {showMessage && (
          <em className="status-message">Updating roster. It may take a few minutes...</em>
        )}
        <Button
          variant="contained"
          disabled={!isSelection}
          onClick={handleSave}
          className={`save-button ${isSelection ? 'enabled' : 'disabled'}`}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default RosterFooter;
