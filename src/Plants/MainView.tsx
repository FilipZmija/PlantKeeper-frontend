import React from "react";
import UploadImage from "../Identification/UploadImage";
import PlantCard from "./PlantCard";
import Carousel from "./Carousel";

export default function MainView() {
  const plant = {
    id: 44,
    name: "Yucca elephantipes",
    apiId: "a5178737-1b07-56b8-8667-0be3477fef48",
    commonName: "Spineless yucca, Palm lily",
    avaibility: "Regular",
    lightTolerated: "Strong light ( 21,500 to 3,200 lux/2000 to 300 fc)",
    lightIdeal: "Full sun (+21,500 lux /+2000 fc )",
    temperatureMax: 30,
    temperatureMin: 12,
    watering: "Keep moist between watering & Water when soil is half dry",
    climat: "Subtropical",
  };
  return (
    <>
      {/* <PlantCard plant={plant} /> */}
      <Carousel />
    </>
  );
}
