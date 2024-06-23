import React from "react";
import UploadImage from "./UploadImage";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const Modal = ({ isOpen, onClose }: ModalProps) => {
  return isOpen ? (
    <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-40">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relativexs rounded-lg shadow bg-dark-green">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="w-full text-xl font-semibold text-text-green text-center">
              Indentify your plant
            </h3>
            <button
              type="button"
              className="text-text-green bg-transparent hover:bg-green hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">
            <UploadImage />
          </div>
          {/* Modal footer */}
          <div className="flex items-center space-x-2 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={onClose}
              className="text-text-green font-bold hover:bg-green bg-green bg-opacity-55 px-4 py-1 rounded-md active:scale-95"
            >
              Cancel
            </button>
            {/* <button className="text-dark-green font-bold hover:bg-green  bg-text-green  px-4 py-1 rounded-md active:scale-95">
              Hide
            </button> */}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
