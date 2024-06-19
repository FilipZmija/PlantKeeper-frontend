import React, { useState } from "react";
import { EditablePlantInfo } from "./PlantEditableCell";
import PlantProp from "../../Reusable/PlantProp";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { editOwnedPlant } from "../../../redux/ownedPlantSlice";
import PlantEditableProp from "../../Reusable/PlantEditableProp";
import LineChart from "./LineChart";
import { getDate } from "../../../helpers/date";

type TPlantCareInfoComponent = {
  plantIndex: number;
  index?: number;
};
const data = [
  { name: getDate(-6).getTime(), pv: 24 },
  { name: getDate(-5).getTime(), pv: 13 },
  { name: getDate(-4).getTime(), pv: 10 },
  { name: getDate(-3).getTime(), pv: 39 },
  { name: getDate(-2).getTime(), pv: 48 },
  { name: getDate(-1).getTime(), pv: 38 },
  { name: getDate(0).getTime(), pv: 43 },
];

export default function PlantCareInfoComponent({
  plantIndex,
  index = 1,
}: TPlantCareInfoComponent) {
  const dispatch = useAppDispatch();
  const { desiredMoisture, soliMoisture, id } = useAppSelector(
    (state) => state.ownedPlant.ownedPlants[plantIndex]
  );
  const [soilMoisture, setSoilMoisture] = useState<number | null>(null);
  const handleSave = () => {
    soilMoisture &&
      dispatch(
        editOwnedPlant({
          id: id,
          value: soilMoisture,
          key: "desiredMoisture",
        })
      );
  };
  const PlantWateringComponent = (mode: string) => {
    const handleChange = (e: any) => {
      setSoilMoisture(e.target.value);
    };

    return (
      <>
        {mode !== "basic" ? (
          <>
            <LineChart data={data} />
            {mode === "edit" ? (
              <div className="flex flex-col">
                <PlantProp
                  name={"Moisture"}
                  value={soliMoisture ? soliMoisture : "N/A"}
                />

                <PlantEditableProp
                  name={"Expected moisture"}
                  Input={
                    <input
                      onChange={handleChange}
                      value={soilMoisture ? soilMoisture : " "}
                      type="text"
                      id="small-input"
                      className="px-1 block w-3/12 bg-light-mint outline-none text-text-green border border-green rounded-lg text-xs focus:ring-text-green focus:ring-1 focus:border-text-green"
                    />
                  }
                />
              </div>
            ) : (
              <div className="space-y-0.5">
                <PlantProp
                  name={"Moisture"}
                  value={soliMoisture ? soliMoisture : "N/A"}
                />
                <div className="pb-1">
                  <PlantProp
                    name={"Expected moisture"}
                    value={desiredMoisture ? desiredMoisture : "N/A"}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <PlantProp
              name={"Moisture"}
              value={soliMoisture ? soliMoisture : "N/A"}
            />
            <PlantProp
              name={"Exp. moisture"}
              value={desiredMoisture ? desiredMoisture : "N/A"}
            />
          </>
        )}
      </>
    );
  };

  return (
    <>
      <EditablePlantInfo
        buttonText={"EXPAND"}
        Child={PlantWateringComponent}
        plantId={id}
        index={index}
        plantIndex={plantIndex}
        saveItems={handleSave}
      />
    </>
  );
}
