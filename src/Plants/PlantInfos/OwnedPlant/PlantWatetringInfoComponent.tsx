import React from "react";
import { EditablePlantInfo } from "./PlantEditableCell";
import PlantProp from "../../Reusable/PlantProp";
import { dayDifference } from "../../../helpers/date";
import { useAppSelector } from "../../../redux/hooks";
import PlantEditableProp from "../../Reusable/PlantEditableProp";
import WateredChart from "./WateredChart";
import SelectDropdown from "../../Reusable/DropDown";
import MyDatePicker from "../../Reusable/Datepicker";

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
      <>
        <WateredChart />
        {mode === "edit" ? (
          <div className="flex flex-col">
            <PlantEditableProp
              name={"Auto watering"}
              Input={
                <SelectDropdown
                  options={["off", "After time", "Below moisture"]}
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    console.log(event);
                  }}
                  defaultValue={"off"}
                />
              }
            />
            <PlantEditableProp name={"Watered"} Input={<MyDatePicker />} />
          </div>
        ) : (
          <>
            <PlantProp name={"Auto watering"} value={wateringType} />
            <PlantProp
              name={"Watered"}
              value={
                lastWatered
                  ? dayDifference(new Date(lastWatered)) + " days ago"
                  : "Never"
              }
            />
          </>
        )}
      </>
    ) : (
      <>
        <PlantProp name={"Auto watering"} value={wateringType} />
        <PlantProp
          name={"Watered"}
          value={
            lastWatered
              ? dayDifference(new Date(lastWatered)) + " days ago"
              : "Never"
          }
        />
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
