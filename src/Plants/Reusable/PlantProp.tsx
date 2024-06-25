import React from "react";

export default function PlantProp({
  name,
  value,
}: {
  name?: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-row space-x-1">
      {name && <h5 className={`font-bold text-text-green`}>{name}:</h5>}
      <h5 className={`font-normal text-text-green`}>{value}</h5>
    </div>
  );
}
