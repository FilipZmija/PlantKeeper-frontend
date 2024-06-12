import React, { ReactNode } from "react";

export default function PlantEditableProp({
  name,
  Input,
}: {
  name?: string;
  Input: ReactNode;
}) {
  return (
    <div className="flex flex-row space-x-1 w-full">
      {name && <h5 className={`font-bold text-text-green`}>{name}:</h5>}
      {Input}
    </div>
  );
}
