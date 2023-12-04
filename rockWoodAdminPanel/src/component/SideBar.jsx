// Sidebar.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFileAlt, faImages, faInfo, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const SideBar = ({ isSidebarOpen, activeTab, handleTabClick,toggleSidebar }) => {
  return (
    <div className={`h-screen ${isSidebarOpen ? 'w-64' : 'w-16'} bg-gray-800 text-white fixed top-0 left-0 transition-all duration-300`}>
      <div className="p-4">
        <button className="text-2xl" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className="flex flex-col">
        <TabButton
          icon={faFileAlt}
          label={isSidebarOpen ? "Text" : null}
          active={activeTab === "text"}
          onClick={() => handleTabClick("text")}
        />
        <TabButton
          icon={faImages}
          label={isSidebarOpen ? "Photos" : null}
          active={activeTab === "photos"}
          onClick={() => handleTabClick("photos")}
        />
        <TabButton
          icon={faInfo}
          label={isSidebarOpen ? "Details" : null}
          active={activeTab === "details"}
          onClick={() => handleTabClick("details")}
        />
        <TabButton
          icon={faSignOutAlt}
          label={isSidebarOpen ? "Logout" : null}
          active={activeTab === "logout"}
          onClick={() => handleTabClick("logout")}
        />
      </div>
    </div>
  );
};

const TabButton = ({ icon, label, active, onClick }) => {
  const baseClasses = "p-3 cursor-pointer flex items-center";
  const activeClasses = active ? "bg-gray-700" : "";

  return (
    <div className={`${baseClasses} ${activeClasses}`} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      {label && <span>{label}</span>}
    </div>
  );
};

export default SideBar;
