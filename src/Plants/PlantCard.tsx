import React, { useCallback, useState } from "react";
import Carousel from "./Reusable/Carousel";
import PlantBasicInfo from "./PlantInfos/PlantBasicInfo";
import OwnedPlantInfo from "./PlantInfos/OwnedPlantInfo";
import { useAppSelector } from "../redux/hooks";

const cardSizeClasses = {
  xsmall: "max-w-56",
  small: "max-w-xs",
  medium: "max-w-sm",
  large: "max-w-md",
};

const cardSizeClassesPadding = {
  xsmall: "p-2",
  small: "p-3",
  medium: "p-4",
  large: "p-5",
};

const textSizeClasses = {
  xsmall: "text-md",
  small: "text-lg",
  medium: "text-xl",
  large: "text-2xl",
};

const commonNameSizeClasses = {
  xsmall: "text-sm",
  small: "text-base",
  medium: "text-lg",
  large: "text-xl",
};

const infoSizeClasses = {
  xsmall: "text-xs",
  small: "text-xs",
  medium: "text-sm",
  large: "text-base",
};
const infoSizeClassesPadding = {
  xsmall: "p-1 text-xs",
  small: "p-2 text-xs",
  medium: "p-2 text-sm",
  large: "p-3 text-base",
};

export interface PlantCardProps {
  plantIndex: number;
  size?: "xsmall" | "small" | "medium" | "large";
}

export default function PlantCard({
  size = "small",
  plantIndex,
}: PlantCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { plant, image } = useAppSelector(
    (state) => state.ownedPlant.ownedPlants[plantIndex]
  );
  const sizeClass = cardSizeClasses[size];
  const paddingClass = cardSizeClassesPadding[size];
  const textSizeClass = textSizeClasses[size];
  const commonNameSizeClass = commonNameSizeClasses[size];
  const infoSizeClass = infoSizeClasses[size];
  const infoSizeClassPadding = infoSizeClassesPadding[size];

  const plantBasicInfo = useCallback(
    () => (
      <PlantBasicInfo
        plantIndex={plantIndex}
        sizeClass={infoSizeClass}
        sizeClassPadding={infoSizeClassPadding}
      />
    ),
    [plantIndex, infoSizeClass, infoSizeClassPadding]
  );

  const plantPersonalInfo = useCallback(
    () => (
      <OwnedPlantInfo
        plantIndex={plantIndex}
        sizeClass={infoSizeClass}
        sizeClassPadding={infoSizeClassPadding}
      />
    ),
    [plantIndex, infoSizeClass, infoSizeClassPadding]
  );

  const handleImageClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <div
        className={`rounded-lg bg-green shadow-md m-2 border-light-brown border-2 ${sizeClass} h-fit`}
      >
        <img
          className={` transition-height duration-300 xs:h-${
            isModalOpen ? 96 : 72
          } md:h-${
            isModalOpen ? 96 : 36
          } w-full rounded-t-lg object-cover cursor-pointer`}
          src={image}
          alt={plant.name}
          onClick={handleImageClick}
        />
        <div className={`rounded-b-lg ${paddingClass} min-h-60`}>
          <h5
            className={`font-bold tracking-tight text-text-green ${textSizeClass}`}
          >
            {plant.name}
          </h5>
          {plant.commonName && (
            <h5
              className={`mb-2 font-normal tracking-tight text-text-green ${commonNameSizeClass}`}
            >
              {plant.commonName}
            </h5>
          )}
          <Carousel
            components={[plantBasicInfo, plantPersonalInfo]}
            size={size}
          />
        </div>
      </div>

      {/* {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div className="relative bg-white p-4 rounded-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <img
              className="max-h-screen max-w-full object-cover"
              src={image}
              alt={plant.name}
            />
          </div>
        </div>
      )} */}
    </>
  );
}
