// MainLayout.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './SideBar';
import TextTab from './content/TextTab';
import PhotosTab from './content/PhotosTab';
import DetailsTab from './content/DetailsTab';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("text");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Router>
      <div className="flex">
        <SideBar isSidebarOpen={isSidebarOpen} activeTab={activeTab} handleTabClick={handleTabClick} toggleSidebar={toggleSidebar} />
        <div className="flex flex-col flex-grow">
          <NavBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          {/* Main content goes here */}
          <Routes>
          <Route path="/text" element={<TextTab isSidebarOpen={isSidebarOpen}/>} />
          <Route path="/photos" element={<PhotosTab />} />
          <Route path="/details" element={<DetailsTab />} />
          <Route path="/" element={<TextTab />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default MainLayout;
