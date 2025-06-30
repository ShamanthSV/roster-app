import React, { useState } from 'react';
import './RosterHeader.css';
import { MenuItem, Select, TextField, IconButton, Menu } from '@mui/material';
import PrintIcon from '@mui/icons-material/PrintOutlined';
import FileDownloadIcon from '@mui/icons-material/IosShare';

const roles = [
  'Active Students',
  'Inactive Students',
  'Section Instructor',
  'Teaching Assistants',
  'All Members',
];

const RosterHeader = ({
  searchTerm,
  setSearchTerm,
  selectedRole,
  setSelectedRole,
  selectedCount,
  onExportAll,
  onExportSelected,
}) => {
  const [anchorElPrint, setAnchorElPrint] = useState(null);
  const [anchorElExport, setAnchorElExport] = useState(null);

  const handlePrintClick = (event) => {
    setAnchorElPrint(event.currentTarget);
  };

  const handlePrintClose = () => {
    setAnchorElPrint(null);
  };

  const handleExportClick = (event) => {
    setAnchorElExport(event.currentTarget);
  };

  const handleExportClose = () => {
    setAnchorElExport(null);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleExportAll = () => {
    onExportAll?.();
    handleExportClose();
  };

  const handleExportSelected = () => {
    if (selectedCount > 0) {
      onExportSelected?.();
    }
    handleExportClose();
  };

  return (
    <div className="roster-header" role="region" aria-label="Roster controls">
      <div className="controls-right">
        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
          className="search-field"
          aria-label="Search Members"
          placeholder="Enter filter criteria"
        />
        <Select
          value={selectedRole}
          onChange={handleRoleChange}
          className="role-select"
          size="small"
          aria-label="Filter by Role"
          MenuProps={{ PaperProps: { style: { fontSize: '12px' } } }}
          sx={{ fontSize: '12px' }}
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role} style={{ fontSize: '12px' }}>
              {role}
            </MenuItem>
          ))}
        </Select>

        {/* Print Icon */}
        <IconButton
          aria-label="Print Options"
          onClick={handlePrintClick}
          className="print-button"
          size="large"
        >
          <PrintIcon />
        </IconButton>
        <Menu
          anchorEl={anchorElPrint}
          open={Boolean(anchorElPrint)}
          onClose={handlePrintClose}
          MenuListProps={{ 'aria-labelledby': 'print-button' }}
        >
          <MenuItem onClick={handlePrintClose} style={{ fontSize: '12px' }}>
            Print All
          </MenuItem>
          <MenuItem
            onClick={handlePrintClose}
            disabled={selectedCount === 0}
            style={{ fontSize: '12px' }}
          >
            Print Selected
          </MenuItem>
        </Menu>

        {/* Export Icon */}
        <IconButton
          aria-label="Export Options"
          onClick={handleExportClick}
          className="export-button"
          size="large"
        >
          <FileDownloadIcon />
        </IconButton>
        <Menu
          anchorEl={anchorElExport}
          open={Boolean(anchorElExport)}
          onClose={handleExportClose}
          MenuListProps={{ 'aria-labelledby': 'export-button' }}
        >
          <MenuItem onClick={handleExportAll} style={{ fontSize: '12px' }}>
            Export All
          </MenuItem>
          <MenuItem
            onClick={handleExportSelected}
            disabled={selectedCount === 0}
            style={{ fontSize: '12px' }}
          >
            Export Selected
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default RosterHeader;
