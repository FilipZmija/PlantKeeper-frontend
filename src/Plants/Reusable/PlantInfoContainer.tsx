import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";

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
  const [show, setShow] = React.useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      className={`my-1 mx-1 transition-opacity ease-in  ${sizeClass} ${
        show ? "opacity-100 animate-fadeIn" : "opacity-0"
      }
      }`}
    >
      <div
        className={`bg-lightgreen rounded-lg shadow-md  ${sizeClassPadding}`}
      >
        <ChildComponent />
      </div>
    </div>
  );
}
