import React, { useEffect } from "react";
import PlantCard from "./PlantCard";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setOwnedPlants } from "../redux/ownedPlantSlice";

export default function MainView() {
  const dispatch = useAppDispatch();
  const { ownedPlants } = useAppSelector((state) => state.ownedPlant);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/ownedplant/user/1`
      );
      console.log(response.data);
      dispatch(setOwnedPlants([...response.data, ...response.data]));
    })();
  }, [dispatch]);

  return (
    <div className="flex flex-row flex-wrap justify-center sm:mx-5 md:mx-10 lg:mx-24 xl:mx-36 2xl:mx-48">
      {ownedPlants.map((item, index) => (
        <PlantCard key={item.id} plantIndex={index} />
      ))}
    </div>
  );
}
