import React, { useEffect, useMemo, useState } from "react";
import PlantCard from "./PlantCard";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setOwnedPlants } from "../redux/ownedPlantSlice";
import { useWindowSize } from "../hooks/Size";
import { TOwnedPlant } from "../types/plants";
const mediumScreen = 750;
const largeScreen = 1240;
const xlargeScreen = 1536;

const splitArray = (arr: any[], size: number) => {
  console.log("hi");

  const res: number[][] = new Array(size).fill(0).map((item) => []);

  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    res[index].push(i);
    index++;
    if (index >= size) index = 0;
  }
  return res;
};
export default function MainView() {
  const dispatch = useAppDispatch();
  const { ownedPlants } = useAppSelector((state) => state.ownedPlant);
  const [width] = useWindowSize();

  const sortedOwnedPlants: number[][] = useMemo(() => {
    if (width < mediumScreen) return ownedPlants.map((_, i) => [i]);
    else if (width < largeScreen) return splitArray(ownedPlants, 2);
    else if (width < xlargeScreen) return splitArray(ownedPlants, 3);
    else return splitArray(ownedPlants, 4);
  }, [ownedPlants, width]);

  useEffect(() => {}, []);
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/ownedplant/user/1`
      );
      console.log(response.data);
      dispatch(setOwnedPlants(response.data));
    })();
  }, [dispatch]);

  return (
    <div className="flex flex-col flex-wrap justify-center items-center sm:mx-5 md:mx-10 lg:mx-24 xl:mx-36 2xl:mx-48">
      <div className="flex flex-row flex-wrap justify-center my-2 mx-8 md:mx-2 bg-lightgreen md:px-16 py-8 rounded-2xl">
        {sortedOwnedPlants.map((ownedPlants) => (
          <div>
            {ownedPlants.map((plantIndex) => (
              <PlantCard size="small" plantIndex={plantIndex} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
