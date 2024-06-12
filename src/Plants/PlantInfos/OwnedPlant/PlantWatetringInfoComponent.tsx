import React, { useCallback } from "react";
import { EditablePlantInfo } from "./PlantEditableCell";
import PlantProp from "../../Reusable/PlantProp";
import { dayDifference } from "../../../helpers/date";
import { useAppSelector } from "../../../redux/hooks";

type TPlantWatetringInfoComponent = {
  index?: number;
  plantIndex: number;
};

export default function PlantWatetringInfoComponent({
  index = 2,
  plantIndex,
}: TPlantWatetringInfoComponent) {
  const { wateringType, lastWatered, id } = useAppSelector(
    (state) => state.ownedPlant.ownedPlants[plantIndex]
  );

  const PlantWateringComponent = (mode: string) => {
    return mode !== "basic" ? (
      <div>hej edit me</div>
    ) : (
      <>
        {wateringType && (
          <PlantProp name={"Auto watering"} value={wateringType} />
        )}
        {lastWatered && (
          <PlantProp
            name={"Watered"}
            value={dayDifference(new Date(lastWatered)) + " days ago"}
          />
        )}
      </>
    );
  };

  return (
    <>
      <EditablePlantInfo
        buttonText={"EXPAND"}
        Child={PlantWateringComponent}
        index={index}
        plantId={id}
        plantIndex={plantIndex}
      />
    </>
  );
}
