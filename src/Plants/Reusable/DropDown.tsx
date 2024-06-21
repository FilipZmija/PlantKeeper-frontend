// SelectDropdown.tsx
import React, { useState } from "react";

interface SelectDropdownProps {
  options: string[];
  defaultValue: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    onChange(event);
  };
  return (
    <div className="relative inline-block w-1/2">
      <select
        value={value}
        onChange={handleChange}
        className="block appearance-none w-full  px-2 pr-8 rounded shadow leading-tight focus:outline-none  bg-light-mint outline-none text-text-green border border-green text-xs focus:ring-text-green focus:ring-1 focus:border-text-green"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

export default SelectDropdown;
