import React, { useCallback } from "react";
import PlantProp from "../Reusable/PlantProp";
import PlantInfoContainer from "../Reusable/PlantInfoContainer";
import { useAppSelector } from "../../redux/hooks";

export default function PlantBasicInfo({
  plantIndex,
  sizeClass,
  sizeClassPadding,
}: {
  plantIndex: number;
  sizeClass: string;
  sizeClassPadding: string;
}) {
  const { plant } = useAppSelector(
    (state) => state.ownedPlant.ownedPlants[plantIndex]
  );
  const PlantClimatInfo: React.FC = useCallback(
    () => (
      <>
        {plant.climat && <PlantProp name={"Climat"} value={plant.climat} />}
        {plant.avaibility && (
          <PlantProp name={"Availability"} value={plant.avaibility} />
        )}
      </>
    ),
    [plant.climat, plant.avaibility]
  );
  const PlantTemperatureInfo: React.FC = useCallback(
    () => (
      <>
        <p className="text-text-green font-bold">Temperature</p>
        <div className="flex items-center justify-between mt-2">
          <p
            className={`${"s"} text-text-green font-semibold w-full text-center`}
          >
            {plant.temperatureMin} - {plant.temperatureMax}&#176;C
          </p>
        </div>
      </>
    ),
    [plant.temperatureMax, plant.temperatureMin]
  );
  const PlantCareInfo: React.FC = useCallback(
    () => (
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
        {plant.watering && (
          <PlantProp name={"Watering"} value={plant.watering} />
        )}
      </>
    ),
    [plant.lightTolerated, plant.lightIdeal, plant.watering]
  );

  return (
    <>
      <PlantInfoContainer
        ChildComponent={PlantCareInfo}
        sizeClass={sizeClass}
        sizeClassPadding={sizeClassPadding}
      />
      <div className="flex flex-row space-x-2 justify-center">
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
