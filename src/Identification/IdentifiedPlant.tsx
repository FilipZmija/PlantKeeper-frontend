import React, { useCallback, useState } from "react";

import { useAppSelector } from "../redux/hooks";
import PlantBasicInfo from "../Plants/PlantInfos/PlantBasicInfo";
import { TPlant } from "../types/plants";

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
  plant: TPlant;
  image: string;
  size: "xsmall" | "small" | "medium" | "large";
}

export default function PlantCard({
  plant,
  image,
  size = "small",
}: PlantCardProps) {
  const sizeClass = cardSizeClasses[size];
  const paddingClass = cardSizeClassesPadding[size];
  const textSizeClass = textSizeClasses[size];
  const commonNameSizeClass = commonNameSizeClasses[size];

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
        </div>
      </div>
    </>
  );
}
