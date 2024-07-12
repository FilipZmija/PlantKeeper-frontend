import React, { useEffect, useState } from "react";
import { TPlant } from "../types/plants";
import PlantCard from "../Plants/PlantCard";
import IdentifiedPlant from "./IdentifiedPlant";
import UploadIdentification from "./UploadIdentification";
import { useAppSelector } from "../redux/hooks";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFileName] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [identifiedPlant, setIdentifiedPlant] = useState<TPlant | null>(null);
  const [isCreated, setIsCreated] = useState(false);
  const index = useAppSelector((state) => state.ownedPlant.ownedPlants.length);
  useEffect(() => {
    setFile(null);
    setImage(null);
    setLoading(false);
    setIdentifiedPlant(null);
  }, [isOpen]);

  useEffect(() => {
    setIdentifiedPlant(null);
  }, [image, file]);

  const handleDiscard = () => {
    setFile(null);
    setImage(null);
    setLoading(false);
    setIdentifiedPlant(null);
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-40">
      <div className="relative p-4 w-fit max-w-2xl max-h-full">
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

          {/* Modal content */}
          <div
            className={`flex flex-col items-center transition-all duration-500 `}
          >
            {isCreated ? (
              <PlantCard plantIndex={index - 1} />
            ) : image && identifiedPlant && filename ? (
              <IdentifiedPlant
                setIsCreated={setIsCreated}
                handleDiscard={handleDiscard}
                plant={identifiedPlant}
                image={image}
                size={"small"}
                filename={filename}
              />
            ) : (
              <UploadIdentification
                setFileName={setFileName}
                handleDiscard={handleDiscard}
                file={file}
                setFile={setFile}
                image={image}
                setImage={setImage}
                loading={loading}
                setLoading={setLoading}
                setIdentifiedPlant={setIdentifiedPlant}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
