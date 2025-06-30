import React from 'react';
import './RosterTableHeader.css';

const headers = [
  { key: 'lastName', label: 'Last Name' },
  { key: 'firstName', label: 'First Name' },
  { key: 'email', label: 'Email' },
  { key: 'username', label: 'Username' },
  { key: 'role', label: 'Role' }
];

const RosterTableHeader = ({ selectedRole, onSort, sortConfig, showCheckboxes, disabled = false }) => {
  const getAriaSort = (key) => {
    if (disabled) return 'none'; // no sorting when disabled
    if (sortConfig.key !== key) return 'none';
    return sortConfig.direction === 'asc' ? 'ascending' : 'descending';
  };

  const getArrowClass = (key, arrow) => {
    if (disabled) return 'arrow-disabled'; // all arrows disabled when disabled
    if (sortConfig.key !== key) return 'arrow-disabled';
    if (sortConfig.direction === 'asc' && arrow === 'up') return 'arrow-active';
    if (sortConfig.direction === 'desc' && arrow === 'down') return 'arrow-active';
    return 'arrow-disabled';
  };

  return (
    <thead className={`table-header ${disabled ? 'table-header-disabled' : ''}`}>
      <tr>
        {showCheckboxes && <th className="header-cell checkbox-cell"></th>}
        {headers.map(({ key, label }) => {
          if (selectedRole !== 'All Members' && key === 'role') return null;
          return (
            <th
              key={key}
              className={`header-cell sortable ${disabled ? 'disabled' : ''}`}
              aria-sort={getAriaSort(key)}
              onClick={() => !disabled && onSort(key)}
              tabIndex={disabled ? -1 : 0}
              role="columnheader"
            >
              <div className="header-label">
                {label}
                <span className="sort-icons">
                  <span className={`arrow up ${getArrowClass(key, 'up')}`}>&lt;</span>
                  <span className={`arrow down ${getArrowClass(key, 'down')}`}>&gt;</span>
                </span>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default RosterTableHeader;
