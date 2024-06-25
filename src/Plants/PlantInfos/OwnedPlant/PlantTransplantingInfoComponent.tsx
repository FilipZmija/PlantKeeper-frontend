import React from "react";
import { EditablePlantInfo } from "./PlantEditableCell";
import PlantProp from "../../Reusable/PlantProp";
import { dayDifference, getDate } from "../../../helpers/date";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { editOwnedPlant } from "../../../redux/ownedPlantSlice";
import WateredChart from "./DotChart";
import PlantEditableProp from "../../Reusable/PlantEditableProp";
import MyDatePicker from "../../Reusable/Datepicker";

const data: Date[] = [
  getDate(-46),
  getDate(-36),
  getDate(-30),
  getDate(-26),
  getDate(-19),
  getDate(-12),
  getDate(-7),
  getDate(-1),
];

const formattedData = data.map((date) => ({
  date,
  watered: 1,
}));

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
      <>
        <WateredChart data={formattedData} />
        {mode === "edit" ? (
          <>
            <PlantEditableProp
              name={"Fertalized"}
              Input={
                <MyDatePicker
                  onChange={(date: Date | null) =>
                    dispatch(
                      editOwnedPlant({
                        key: "lastFertilized",
                        value: date ? date.toDateString() : null,
                        id,
                      })
                    )
                  }
                  onLog={() => console.log("log")}
                  value={lastFertilized ? new Date(lastFertilized) : null}
                />
              }
            />
            <PlantEditableProp
              name={"Transplanted"}
              Input={
                <MyDatePicker
                  onChange={(date: Date | null) =>
                    dispatch(
                      editOwnedPlant({
                        key: "lastTransplanted",
                        value: date ? date.toDateString() : null,
                        id,
                      })
                    )
                  }
                  onLog={() => console.log("log")}
                  value={lastTransplanted ? new Date(lastTransplanted) : null}
                />
              }
            />
          </>
        ) : (
          <>
            <PlantProp
              name={"Fertalized"}
              value={
                lastFertilized
                  ? dayDifference(new Date(lastFertilized)) + " days ago"
                  : "Never"
              }
            />
            <PlantProp
              name={"Transplanted"}
              value={
                lastTransplanted
                  ? dayDifference(new Date(lastTransplanted)) + " days ago"
                  : "Never"
              }
            />
          </>
        )}
      </>
    ) : (
      <>
        <PlantProp
          name={"Fertalized"}
          value={
            lastFertilized
              ? dayDifference(new Date(lastFertilized)) + " days ago"
              : "Never"
          }
        />
        <PlantProp
          name={"Transplanted"}
          value={
            lastTransplanted
              ? dayDifference(new Date(lastTransplanted)) + " days ago"
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
