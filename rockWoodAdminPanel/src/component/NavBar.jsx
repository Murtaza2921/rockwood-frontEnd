import React from 'react';

const NavBar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header className={`bg-white shadow ${isSidebarOpen ? 'ml-64' : ''}`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <button className="text-xl font-semibold" onClick={toggleSidebar}>
            {isSidebarOpen ? "Close" : "Open"} Sidebar
          </button>
          {/* Other Navbar items */}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
