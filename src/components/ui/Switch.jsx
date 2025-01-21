import React from 'react';

const Switch = ({ checked, onCheckedChange, disabled = false }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full 
        transition-colors duration-200 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        ${checked ? 'bg-blue-500' : 'bg-gray-200'} 
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
      `}
    >
      <span
        aria-hidden="true"
        className={`
          pointer-events-none inline-block h-5 w-5 transform rounded-full 
          bg-white shadow ring-0 transition duration-200 ease-in-out
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
};

// Example Usage Component
const SwitchDemo = () => {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <Switch 
          checked={enabled} 
          onCheckedChange={setEnabled} 
        />
        <span>Switch is {enabled ? 'ON' : 'OFF'}</span>
      </div>

      <div className="flex items-center gap-4">
        <Switch 
          checked={true} 
          onCheckedChange={() => {}} 
          disabled={true} 
        />
        <span>Disabled ON state</span>
      </div>

      <div className="flex items-center gap-4">
        <Switch 
          checked={false} 
          onCheckedChange={() => {}} 
          disabled={true} 
        />
        <span>Disabled OFF state</span>
      </div>
    </div>
  );
};

export default SwitchDemo;
export { Switch };