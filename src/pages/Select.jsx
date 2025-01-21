import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({ 
  value, 
  onValueChange, 
  placeholder = "Select an option",
  disabled = false,
  children 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const [selectedLabel, setSelectedLabel] = useState('');

  useEffect(() => {
    // Update selected label when value changes
    const selectedOption = React.Children.toArray(children)
      .find(child => child.props.value === value);
    setSelectedLabel(selectedOption ? selectedOption.props.children : placeholder);
  }, [value, children, placeholder]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={selectRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
        className={`
          relative w-full cursor-pointer rounded-md border border-gray-300
          bg-white py-2 pl-3 pr-10 text-left shadow-sm
          focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
          transition-all duration-200 ease-in-out
        `}
      >
        <span className="block truncate">
          {selectedLabel}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      {isOpen && (
        <ul
          className={`
            absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md 
            bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 
            focus:outline-none
          `}
          role="listbox"
          tabIndex={-1}
        >
          {React.Children.map(children, child => {
            if (!React.isValidElement(child)) return null;
            
            const isSelected = child.props.value === value;
            
            return React.cloneElement(child, {
              onSelect: () => {
                onValueChange(child.props.value);
                setIsOpen(false);
              },
              isSelected
            });
          })}
        </ul>
      )}
    </div>
  );
};

const SelectItem = ({ 
  value,
  children,
  onSelect,
  isSelected = false 
}) => {
  return (
    <li
      className={`
        relative cursor-pointer select-none py-2 pl-3 pr-9 
        ${isSelected 
          ? 'bg-blue-50 text-blue-900' 
          : 'text-gray-900 hover:bg-gray-50'
        }
      `}
      onClick={onSelect}
      role="option"
      aria-selected={isSelected}
    >
      <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-normal'}`}>
        {children}
      </span>
      {isSelected && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
          <svg 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </span>
      )}
    </li>
  );
};

// Example Usage Component
const SelectDemo = () => {
  const [value, setValue] = useState('');

  return (
    <div className="p-4 space-y-4">
      <Select 
        value={value} 
        onValueChange={setValue}
        placeholder="Select a component"
      >
        <SelectItem value="timer">Timer</SelectItem>
        <SelectItem value="http">HTTP</SelectItem>
        <SelectItem value="sql">SQL</SelectItem>
        <SelectItem value="log">Log</SelectItem>
      </Select>

      <Select 
        value="disabled-value" 
        onValueChange={() => {}}
        placeholder="Disabled select"
        disabled
      >
        <SelectItem value="disabled-value">Disabled Option</SelectItem>
      </Select>
    </div>
  );
};

export default SelectDemo;
export { Select, SelectItem };