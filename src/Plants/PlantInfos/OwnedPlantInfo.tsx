import React, { useCallback } from "react";
import PlantInfoContainer from "../Reusable/PlantInfoContainer";
import { useAppSelector } from "../../redux/hooks";
import PlantWatetringInfoComponent from "./OwnedPlant/PlantWatetringInfoComponent";
import PlantTransplantedInfoComponent from "./OwnedPlant/PlantTransplantingInfoComponent";
import PlantCareInfoComponent from "./OwnedPlant/PlantCareInfoComponent";

type TOwnedPlantInfoProps = {
  plantIndex: number;
  sizeClass: string;
  sizeClassPadding: string;
};

export default function OwnedPlantInfo({
  plantIndex,
  sizeClass,
  sizeClassPadding,
}: TOwnedPlantInfoProps) {
  const { inEdit, inEditIndex, animClassSelected } = useAppSelector(
    (state) => state.ownedPlant.editMode[plantIndex]
  );
  const PlantCare = useCallback(
    () => <PlantCareInfoComponent plantIndex={plantIndex} />,
    [plantIndex]
  );

  const PlantWatering = useCallback(
    () => <PlantWatetringInfoComponent plantIndex={plantIndex} />,
    [plantIndex]
  );

  const PlantTransplanted = useCallback(
    () => <PlantTransplantedInfoComponent plantIndex={plantIndex} />,
    [plantIndex]
  );
  const PlantFertalized = useCallback(
    () => <PlantTransplantedInfoComponent plantIndex={plantIndex} />,
    [plantIndex]
  );
  return (
    <>
      <div className={`flex flex-row w-full px-1 ${animClassSelected}`}>
        {(inEditIndex === 1 || !inEdit) && (
          <PlantInfoContainer
            ChildComponent={PlantCare}
            sizeClass={sizeClass}
            sizeClassPadding={sizeClassPadding}
          />
        )}
        {(inEditIndex === 2 || !inEdit) && (
          <PlantInfoContainer
            ChildComponent={PlantWatering}
            sizeClass={sizeClass}
            sizeClassPadding={sizeClassPadding}
          />
        )}
      </div>
      <div className="flex flex-row space-x-2 justify-center">
        {(inEditIndex === 3 || !inEdit) && (
          <PlantInfoContainer
            ChildComponent={PlantTransplanted}
            sizeClass={sizeClass}
            sizeClassPadding={sizeClassPadding}
          />
        )}
      </div>
    </>
  );
}
