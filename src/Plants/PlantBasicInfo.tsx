import React from "react";
import PlantProp from "./PlantProp";
import { TPlant } from "../types/plants";
import PlantInfoContainer from "./PlantInfoContainer";

const sizeClasses = {
  xsmall: "text-xs",
  small: "text-xs",
  medium: "text-sm",
  large: "text-base",
};
const sizeClassesPadding = {
  xsmall: "p-1 text-xs",
  small: "p-2 text-xs",
  medium: "p-2 text-sm",
  large: "p-3 text-base",
};

export default function PlantBasicInfo({
  plant,
  size = "small",
}: {
  plant: TPlant;
  size?: "xsmall" | "small" | "medium" | "large";
}) {
  const sizeClass = sizeClasses[size];
  const sizeClassPadding = sizeClassesPadding[size];

  const PlantClimatInfo: React.FC = () => (
    <>
      {plant.climat && <PlantProp name={"Climat"} value={plant.climat} />}
      {plant.avaibility && (
        <PlantProp name={"Availability"} value={plant.avaibility} />
      )}
    </>
  );
  const PlantTemperatureInfo: React.FC = () => (
    <>
      <p className="text-text-green font-bold">Temperature</p>
      <div className="flex items-center justify-between mt-2">
        <p
          className={`${sizeClasses} text-text-green font-semibold w-full text-center`}
        >
          {12} - {31}&#176;C
        </p>
      </div>
    </>
  );
  const PlantCareInfo: React.FC = () => (
    <>
      {plant.lightTolerated && (
        <PlantProp
          name={"Light tolerated"}
          value={plant.lightTolerated.split("(")[0]}
        />
      )}
      {plant.lightIdeal && (
        <PlantProp
          name={"Light ideal"}
          value={plant.lightIdeal.split("(")[0]}
        />
      )}
      {plant.watering && <PlantProp name={"Watering"} value={plant.watering} />}
    </>
  );

  return (
    <>
      <PlantInfoContainer
        ChildComponent={PlantCareInfo}
        sizeClass={sizeClass}
        sizeClassPadding={sizeClassPadding}
      />
      <div className="flex flex-row space-x-2">
        <PlantInfoContainer
          ChildComponent={PlantClimatInfo}
          sizeClass={sizeClass}
          sizeClassPadding={sizeClassPadding}
        />
        <PlantInfoContainer
          ChildComponent={PlantTemperatureInfo}
          sizeClass={sizeClass}
          sizeClassPadding={sizeClassPadding}
        />
      </div>
    </>
  );
}
