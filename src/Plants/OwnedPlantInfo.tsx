import React from "react";
import { TOwnedPlant } from "../types/plants";

type TOwnedPlantInfoProps = {
  ownedPlant: TOwnedPlant;
};
export default function OwnedPlantInfo({ ownedPlant }: TOwnedPlantInfoProps) {
  return <div>{ownedPlant.commonName}</div>;
}
