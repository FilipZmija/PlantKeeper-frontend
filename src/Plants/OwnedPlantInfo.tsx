import React, { useCallback, useEffect } from "react";
import { TOwnedPlant } from "../types/plants";
import PlantInfoContainer from "./PlantInfoContainer";
import PlantProp from "./PlantProp";
import { dayDifference, displayReadableDate, getDate } from "../helpers/date";
import { PlantCareInfo } from "./PlantCareInfo";

type TOwnedPlantInfoProps = {
  ownedPlant: TOwnedPlant;
  sizeClass: string;
  sizeClassPadding: string;
};

export default function OwnedPlantInfo({
  ownedPlant,
  sizeClass,
  sizeClassPadding,
}: TOwnedPlantInfoProps) {
  const [editMode, setEditMode] = React.useState<number | null>(null);

  const PlantWateringInfo: React.FC<number> = useCallback(
    (index) => (
      <div className="flex justify-center flex-col">
        {ownedPlant.wateringType && (
          <PlantProp name={"Auto watering"} value={ownedPlant.wateringType} />
        )}
        {ownedPlant.lastWatered && (
          <PlantProp
            name={"Watered"}
            value={
              dayDifference(new Date(ownedPlant.lastWatered)) + " days ago"
            }
          />
        )}
        <button
          onClick={() => setEditMode(index)}
          className="text-text-green font-bold hover:bg-green bg-green bg-opacity-55 px-3 py-0.5 rounded-sm active:scale-95"
        >
          LOG
        </button>
      </div>
    ),
    [ownedPlant.lastWatered, ownedPlant.wateringType, editMode, setEditMode]
  );

  const PlantTransplantedInfo: React.FC<number> = useCallback(
    (index) => (
      <div className="flex justify-center flex-col">
        {ownedPlant.lastTransplanted && (
          <PlantProp
            name={"Transplanted"}
            value={
              dayDifference(new Date(ownedPlant.lastTransplanted)) + " days ago"
            }
          />
        )}
        {ownedPlant.lastFertilized && (
          <PlantProp
            name={"Fertalized"}
            value={
              dayDifference(new Date(ownedPlant.lastFertilized)) + " days ago"
            }
          />
        )}
        <button
          onClick={() => setEditMode(index)}
          className="text-text-green font-bold hover:bg-green bg-green bg-opacity-55 px-3 py-0.5 rounded-md active:scale-95"
        >
          LOG
        </button>
      </div>
    ),
    [
      ownedPlant.lastFertilized,
      ownedPlant.lastTransplanted,
      editMode,
      setEditMode,
    ]
  );

  return (
    <>
      <div className="flex flex-row space-x-2">
        {(!editMode || editMode === 1) && (
          <PlantInfoContainer
            ChildComponent={() => (
              <PlantCareInfo
                desiredMoisture={ownedPlant.desiredMoisture}
                soliMoisture={ownedPlant.soliMoisture}
              />
            )}
            sizeClass={sizeClass}
            sizeClassPadding={sizeClassPadding}
          />
        )}
        {(!editMode || editMode === 2) && (
          <PlantInfoContainer
            ChildComponent={() => PlantWateringInfo(2)}
            sizeClass={sizeClass}
            sizeClassPadding={sizeClassPadding}
          />
        )}
      </div>
      <div
        className="flex flex-row space-x-2 justify-center
      "
      >
        {(!editMode || editMode === 3) && (
          <PlantInfoContainer
            ChildComponent={() => PlantTransplantedInfo(3)}
            sizeClass={sizeClass}
            sizeClassPadding={sizeClassPadding}
          />
        )}
      </div>
    </>
  );
}
