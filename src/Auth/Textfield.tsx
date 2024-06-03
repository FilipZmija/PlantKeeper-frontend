import React from "react";

interface TextfieldProps {
  label: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function Textfield({ label, inputProps }: TextfieldProps) {
  return (
    <div className="flex mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <label className="block text-xl font-bold leading-6 text-dark-green">
          {label}
        </label>
        <div className="mt-2">
          <input
            className="block text-lg bg-inherit w-full rounded-md px-4 py-1.5 text-text-green shadow-sm ring-2 ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-none focus:ring-inset focus:ring-green sm:leading-6"
            {...inputProps}
          />
        </div>
      </div>
    </div>
  );
}
