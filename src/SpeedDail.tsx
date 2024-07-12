import React, { useState } from "react";
import Modal from "./Identification/IdentificationDialog";
type TSpeedDailProps = {
  className?: string;
};
const SpeedDial = ({ className }: TSpeedDailProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    console.log("Upload button clicked");
    setIsModalOpen(true);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <div className={`fixed end-28 bottom-14 group ${className}`}>
        <div
          id="speed-dial-menu-default"
          className={`flex flex-col items-center ${
            isOpen ? "mb-4 space-y-2" : "hidden"
          }`}
        >
          <button
            type="button"
            data-tooltip-target="tooltip-share"
            data-tooltip-placement="left"
            className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
            onClick={handleClick}
          >
            <svg
              className="w-8 h-8"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>

            <span className="sr-only">Upload</span>
          </button>
          <div
            id="tooltip-share"
            role="tooltip"
            className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Upload
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleMenu}
          aria-controls="speed-dial-menu-default"
          aria-expanded={isOpen}
          className="flex items-center justify-center text-white bg-dark-green rounded-full w-14 h-14 hover:bg-text-green ring-0 focus:ring-4 focus:ring-green focus:outline-none"
        >
          <svg
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-45" : ""
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
          <span className="sr-only">Open actions menu</span>
        </button>
      </div>
    </>
  );
};

export default SpeedDial;
