import React from "react";

export default function PlantProp({
  name,
  value,
  fontSize = "md",
}: {
  name?: string;
  value: string | number;
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}) {
  return (
    <div className="flex flex-row space-x-1">
      {name && (
        <h5 className={`font-bold text-text-green text-${fontSize}`}>
          {name}:
        </h5>
      )}
      <h5 className={`font-normal text-text-green text-${fontSize}`}>
        {value}
      </h5>
    </div>
  );
}
