import React, { useCallback, useState } from "react";
import Carousel from "./Reusable/Carousel";
import PlantBasicInfo from "./PlantInfos/PlantBasicInfo";
import OwnedPlantInfo from "./PlantInfos/OwnedPlantInfo";
import { useAppSelector } from "../redux/hooks";
import {
  cardSizeClasses,
  cardSizeClassesPadding,
  textSizeClasses,
  commonNameSizeClasses,
  infoSizeClasses,
  infoSizeClassesPadding,
} from "./PlantCardStyles";

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
  const { inEdit } = useAppSelector(
    (state) => state.ownedPlant.editMode[plantIndex]
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
        plant={plant}
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
          className={` transition-height duration-300 ${
            isModalOpen ? "xs:h-96" : "xs:h-72"
          } ${
            isModalOpen ? "md:h-96" : "md:h-36"
          } w-full rounded-t-md object-cover cursor-pointer`}
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
            showButtons={!inEdit}
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
