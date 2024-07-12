import React, { useCallback, useState } from "react";

import { useAppDispatch } from "../redux/hooks";
import PlantBasicInfo from "../Plants/PlantInfos/PlantBasicInfo";
import { TOwnedPlant, TPlant } from "../types/plants";
import {
  cardSizeClasses,
  cardSizeClassesPadding,
  commonNameSizeClasses,
  infoSizeClasses,
  infoSizeClassesPadding,
  textSizeClasses,
} from "../Plants/PlantCardStyles";
import axios, { AxiosResponse } from "axios";
import { addOwnedPlant } from "../redux/ownedPlantSlice";

export interface PlantCardProps {
  plant: TPlant;
  image: string;
  size: "xsmall" | "small" | "medium" | "large";
  handleDiscard: () => void;
  filename: string;
  setIsCreated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PlantCard({
  plant,
  image,
  size = "small",
  handleDiscard,
  filename,
  setIsCreated,
}: PlantCardProps) {
  const dispatch = useAppDispatch();
  const sizeClass = cardSizeClasses[size];
  const paddingClass = cardSizeClassesPadding[size];
  const textSizeClass = textSizeClasses[size];
  const commonNameSizeClass = commonNameSizeClasses[size];
  const infoSizeClass = infoSizeClasses[size];
  const infoSizeClassPadding = infoSizeClassesPadding[size];

  const handleAdd = async () => {
    const { id, name } = plant;
    try {
      const response: AxiosResponse<TOwnedPlant> = await axios.post(
        `${process.env.REACT_APP_API_URL}/ownedplant/add`,
        { id, name, filename }
      );
      dispatch(addOwnedPlant(response.data));
      setIsCreated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePowerIdentify = () => {};

  return (
    <>
      <div
        className={`rounded-lg bg-green shadow-md m-2 border-light-brown border-2 ${sizeClass} h-fit`}
      >
        <img
          className={` transition-height duration-300 xs:h-72 md:h-36 w-full rounded-t-lg object-cover cursor-pointer`}
          src={image}
          alt={plant.name}
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
          <PlantBasicInfo
            plant={plant}
            sizeClass={infoSizeClass}
            sizeClassPadding={infoSizeClassPadding}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          onClick={handleAdd}
          className="text-text-green font-bold hover:bg-green bg-green bg-opacity-55 px-4 py-1 rounded-md active:scale-95"
        >
          Add
        </button>
        <button
          onClick={handleDiscard}
          className="text-dark-green font-bold hover:bg-green  bg-text-green  px-4 py-1 rounded-md active:scale-95"
        >
          Discard
        </button>
        <button
          onClick={handlePowerIdentify}
          className="text-dark-green font-bold hover:bg-green  bg-text-green  px-4 py-1 rounded-md active:scale-95"
        >
          Power Identify
        </button>
      </div>
    </>
  );
}
