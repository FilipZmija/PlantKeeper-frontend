import React from "react";
import plantimg from "./img.jpg";
import { Plant } from "../types/plants";
import PlantProp from "./PlantProp";

export interface PlantCardProps {
  plant: Plant;
}
export default function PlantCard({ plant }: PlantCardProps) {
  return (
    <div className="max-w-sm rounded-lg  bg-green shadow-md m-2 border-light-brown border-2">
      <img
        className="h-64 w-full rounded-t-lg object-none"
        src={plant.img ? plant.img : plantimg}
        alt=""
      />
      <div className="p-5">
        <h5 className="text-2xl font-bold tracking-tight text-text-green">
          {plant.name}
        </h5>
        {plant.commonName && (
          <h5 className="mb-2 text-xl font-normal tracking-tight text-text-green">
            {plant.commonName}
          </h5>
        )}
        <div className="flex items-center justify-center">
          <div className="bg-lightgreen p-4 rounded-lg shadow-md">
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
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <div className="my-3">
            <div className="bg-lightgreen p-4 rounded-lg shadow-md">
              {plant.climat && (
                <PlantProp name={"Climat"} value={plant.climat} />
              )}
              {plant.availability && (
                <PlantProp name={"Avaliability"} value={plant.availability} />
              )}
            </div>
          </div>
          <div className="my-3 ml-12">
            <div className=" bg-lightgreen p-4 rounded-lg shadow-md">
              <p className="text-text-green font-bold">Temperature</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg text-text-green font-semibold w-full text-center">
                  {12} - {31}&#176;C
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
