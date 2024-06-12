import React, { useState } from "react";
import { EditablePlantInfo } from "./PlantEditableCell";
import PlantProp from "../../Reusable/PlantProp";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { editOwnedPlant } from "../../../redux/ownedPlantSlice";
import PlantEditableProp from "../../Reusable/PlantEditableProp";
import MyChart from "./Chart";

type TPlantCareInfoComponent = {
  plantIndex: number;
  index?: number;
};

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
            <MyChart />
            {mode === "edit" ? (
              <div className="flex flex-col">
                <PlantProp
                  name={"Soil moisture"}
                  value={soliMoisture ? soliMoisture : "N/A"}
                />
                <PlantEditableProp
                  name={"Desired moisture"}
                  Input={
                    <input
                      onChange={handleChange}
                      value={soilMoisture ? soilMoisture : " "}
                    />
                  }
                />
              </div>
            ) : (
              <>
                <PlantProp
                  name={"Soil moisture"}
                  value={soliMoisture ? soliMoisture : "N/A"}
                />
                <PlantProp
                  name={"Desired moisture"}
                  value={desiredMoisture ? desiredMoisture : "N/A"}
                />
              </>
            )}
          </>
        ) : (
          <>
            <PlantProp
              name={"Soil moisture"}
              value={soliMoisture ? soliMoisture : "N/A"}
            />
            <PlantProp
              name={"Desired moisture"}
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
