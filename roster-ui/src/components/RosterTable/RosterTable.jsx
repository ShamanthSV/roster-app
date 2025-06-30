import React from 'react';
import './RosterTable.css';
import RosterTableHeader from '../RosterTableHeader/RosterTableHeader';
import Checkbox from '@mui/material/Checkbox';

const RosterTable = ({
  data,
  selectedRole,
  searchTerm,
  sortConfig,
  onSort,
  showCheckboxes,
  selectedRows,
  setSelectedRows,
}) => {
  const filteredData = data
    .filter((row) => {
      if (selectedRole !== 'All Members') return row.role === selectedRole;
      return true;
    })
    .filter((row) => {
      const fullText = `${row.firstName} ${row.lastName} ${row.email} ${row.username}`.toLowerCase();
      return fullText.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      const aVal = a[sortConfig.key]?.toLowerCase?.() ?? '';
      const bVal = b[sortConfig.key]?.toLowerCase?.() ?? '';
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  const toggleRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const noResults = filteredData.length === 0;

  return (
    <table
      className={`roster-table ${noResults ? 'table-disabled' : ''}`}
      role="table"
      aria-label="Roster data"
    >
      <RosterTableHeader
        selectedRole={selectedRole}
        onSort={onSort}
        sortConfig={sortConfig}
        showCheckboxes={selectedRole !== 'All Members'}
        disabled={noResults}
      />
      <tbody>
        {noResults ? (
          <tr className="empty-row">
            <td colSpan={selectedRole === 'All Members' ? 5 : 6} className="empty-message">
              <div>No members found</div>
              <div className="sub-message">
                There are currently no {selectedRole.toLowerCase()} for this course
              </div>
            </td>
          </tr>
        ) : (
          filteredData.map((row, index) => {
            const isSelected = selectedRows.includes(row.id);
            return (
              <tr
                key={row.id}
                className={`${index % 2 === 0 ? 'even' : 'odd'} ${isSelected ? 'selected-row' : ''}`}
              >
                {showCheckboxes && (
                  <td className="cell checkbox-cell">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => toggleRow(row.id)}
                      inputProps={{ 'aria-label': `Select ${row.firstName} ${row.lastName}` }}
                      sx={{
                        color: '#006F8F',
                        '&.Mui-checked': { color: '#006F8F' },
                      }}
                    />
                  </td>
                )}
                <td className="cell">{row.lastName}</td>
                <td className="cell">{row.firstName}</td>
                <td className="cell">{row.email}</td>
                <td className="cell">{row.username}</td>
                {selectedRole === 'All Members' && <td className="cell">{row.role}</td>}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default RosterTable;
