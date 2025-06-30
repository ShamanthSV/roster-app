import React, { useState } from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import RosterHeader from './components/RosterHeader/RosterHeader';
import RosterTable from './components/RosterTable/RosterTable';
import RosterFooter from './components/RosterFooter/RosterFooter';
import data from './data/rosterData.json';

function App() {
  const [activeTab, setActiveTab] = useState('roster');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Members');
  const [selectedRows, setSelectedRows] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: 'lastName',
    direction: 'asc',
  });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const visibleData = data.filter((row) => !savedIds.includes(row.id));

  const handleSave = () => {
    setSavedIds([...savedIds, ...selectedRows]);
    setSelectedRows([]);
  };

  return (
    <>
      <Header />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ width: '1024px', margin: '0 auto', padding: '16px' }}>
        {activeTab === 'course' ? (
          <p>Course Settings content will appear here.</p>
        ) : (
          <>
            <RosterHeader
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              selectedCount={selectedRows.length}
            />
            <RosterTable
              data={visibleData}
              selectedRole={selectedRole}
              searchTerm={searchTerm}
              sortConfig={sortConfig}
              onSort={handleSort}
              showCheckboxes={selectedRole !== 'All Members'}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
            {selectedRole !== 'All Members' && (
              <RosterFooter
  selectedRows={selectedRows}
  selectedRole={selectedRole}
  onSave={handleSave}
  allRows={visibleData}
/>

            )}
          </>
        )}
      </main>
    </>
  );
}

export default App;
