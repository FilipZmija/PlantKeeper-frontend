import React from "react";
import { EditablePlantInfo } from "./PlantEditableCell";
import PlantProp from "../../Reusable/PlantProp";
import { dayDifference } from "../../../helpers/date";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { editOwnedPlant } from "../../../redux/ownedPlantSlice";

type TPlantTransplantedInfoComponent = {
  index?: number;
  plantIndex: number;
};

export default function PlantTransplantedInfoComponent({
  index = 3,
  plantIndex,
}: TPlantTransplantedInfoComponent) {
  const { lastFertilized, lastTransplanted, id } = useAppSelector(
    (state) => state.ownedPlant.ownedPlants[plantIndex]
  );
  const dispatch = useAppDispatch();
  const PlantWateringComponent = (mode: string) => {
    const handleChange = () => {
      dispatch(
        editOwnedPlant({
          id: id,
          value: new Date().toString(),
          key: "lastTransplanted",
        })
      );
    };
    return mode !== "basic" ? (
      <div>
        <input onChange={handleChange} />
      </div>
    ) : (
      <>
        {
          <PlantProp
            name={"Transplanted"}
            value={
              lastTransplanted
                ? dayDifference(new Date(lastTransplanted)) + " days ago"
                : "Never"
            }
          />
        }
        {
          <PlantProp
            name={"Fertalized"}
            value={
              lastFertilized
                ? dayDifference(new Date(lastFertilized)) + " days ago"
                : "Never"
            }
          />
        }
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
