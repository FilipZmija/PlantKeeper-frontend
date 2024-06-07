import React from "react";

type TPlantInfoContainerProps = {
  ChildComponent: React.FC<any>;
  sizeClass?: string;
  sizeClassPadding?: string;
};
export default function PlantInfoContainer({
  sizeClass = "medium",
  sizeClassPadding = "medium",
  ChildComponent,
}: TPlantInfoContainerProps) {
  return (
    <div className={`my-1 mx-1 ${sizeClass}`}>
      <div
        className={`bg-lightgreen rounded-lg shadow-md  ${sizeClassPadding}`}
      >
        <ChildComponent />
      </div>
    </div>
  );
}
