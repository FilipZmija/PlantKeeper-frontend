import React from "react";
import UploadImage from "../Identification/UploadImage";
import PlantCard from "./PlantCard";
import Carousel from "./Carousel";
import { TOwnedPlant } from "../types/plants";

export default function MainView() {
  const ownedPlant: TOwnedPlant = {
    id: 1,
    name: "Yucca elephantipes",
    commonName: null,
    lastWatered: null,
    lastTransplanted: null,
    soliMoisture: null,
    desiredMoisture: null,
    wateringType: "off",
    plantId: 44,
    image:
      "https://filipzmijewski.blob.core.windows.net/img/2e5be930-5273-4b10-805a-3a8849cba24d.jpg",
    userId: 1,
    createdAt: "2024-06-02T15:18:41.070Z",
    updatedAt: "2024-06-02T15:18:41.070Z",
    plant: {
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
    },
  };

  return (
    <>
      <PlantCard ownedPlant={ownedPlant} />
    </>
  );
}
