import React from 'react';
import Tooltip from './Tooltip';

const ToolbarButton = ({ icon: Icon, label, onClick, active }) => (
  <Tooltip content={label}>
    <button
      className={`p-2 rounded-md transition-colors ${
        active 
          ? 'bg-gray-200 dark:bg-gray-700' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
    </button>
  </Tooltip>
);

export default ToolbarButton;