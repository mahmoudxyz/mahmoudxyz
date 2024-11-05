import React from 'react';

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)} 
      />
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-lg ${className}`}>
    {children}
  </div>
);

export const DialogHeader = ({ children, className = "" }) => (
  <div className={`space-y-1.5 mb-4 ${className}`}>
    {children}
  </div>
);

export const DialogTitle = ({ children, className = "" }) => (
  <h2 className={`text-lg font-semibold ${className}`}>
    {children}
  </h2>
);

export const DialogTrigger = ({ children, onClick }) => (
  <div onClick={onClick}>
    {children}
  </div>
);