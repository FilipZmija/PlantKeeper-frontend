import React from "react";
import { EditablePlantInfo } from "./PlantEditableCell";
import PlantProp from "../../Reusable/PlantProp";
import { dayDifference, getDate } from "../../../helpers/date";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import PlantEditableProp from "../../Reusable/PlantEditableProp";
import WateredChart from "./DotChart";
import SelectDropdown from "../../Reusable/DropDown";
import MyDatePicker from "../../Reusable/Datepicker";
import { editOwnedPlant } from "../../../redux/ownedPlantSlice";

const data: Date[] = [
  getDate(-1231),
  getDate(-989),
  getDate(-761),
  getDate(-526),
  getDate(-210),
  getDate(-111),
  getDate(-7),
  getDate(-1),
];

const formattedData = data.map((date) => ({
  date,
  watered: 1,
}));

type TPlantWatetringInfoComponent = {
  index?: number;
  plantIndex: number;
};

export default function PlantWatetringInfoComponent({
  index = 2,
  plantIndex,
}: TPlantWatetringInfoComponent) {
  const dispatch = useAppDispatch();
  const { wateringType, lastWatered, id } = useAppSelector(
    (state) => state.ownedPlant.ownedPlants[plantIndex]
  );

  const PlantWateringComponent = (mode: string) => {
    return mode !== "basic" ? (
      <div>
        <WateredChart data={formattedData} />
        {mode === "edit" ? (
          <div className="flex flex-col">
            <PlantEditableProp
              name={"Watering"}
              Input={
                <SelectDropdown
                  options={["off", "After time", "Moisture"]}
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    dispatch(
                      editOwnedPlant({
                        key: "wateringType",
                        value: event.target.value,
                        id,
                      })
                    );
                  }}
                  defaultValue={wateringType}
                />
              }
            />
            <PlantEditableProp
              name={"Watered"}
              Input={
                <MyDatePicker
                  onChange={(date: Date | null) =>
                    dispatch(
                      editOwnedPlant({
                        key: "lastWatered",
                        value: date ? date.toDateString() : null,
                        id,
                      })
                    )
                  }
                  onLog={() => console.log("log")}
                  value={lastWatered ? new Date(lastWatered) : null}
                />
              }
            />
          </div>
        ) : (
          <>
            <PlantProp name={"Watering"} value={wateringType} />
            <PlantProp
              name={"Last watered"}
              value={
                lastWatered
                  ? dayDifference(new Date(lastWatered)) + " days ago"
                  : "Never"
              }
            />
          </>
        )}
      </div>
    ) : (
      <>
        <PlantProp name={"Watering"} value={wateringType} />
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
