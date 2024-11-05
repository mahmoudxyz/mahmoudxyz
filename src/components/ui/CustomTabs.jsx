// Create a new components folder and add CustomTabs.jsx

// components/CustomTabs.jsx
import React from 'react';

export const TabContext = React.createContext();

export const TabProvider = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab);
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const TabList = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-wrap gap-2 mb-6 ${className}`}>
      {children}
    </div>
  );
};

export const TabButton = ({ value, children }) => {
  const { activeTab, setActiveTab } = React.useContext(TabContext);
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
        ${activeTab === value 
          ? 'bg-purple-500 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
    >
      {children}
    </button>
  );
};

export const TabPanel = ({ value, children }) => {
  const { activeTab } = React.useContext(TabContext);
  if (value !== activeTab) return null;
  return <div>{children}</div>;
};

