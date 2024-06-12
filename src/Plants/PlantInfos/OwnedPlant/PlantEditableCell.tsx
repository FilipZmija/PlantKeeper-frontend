import { useDispatch } from "react-redux";
import {
  removeEditIndex,
  setAnimClass,
  setEditIndex,
} from "../../../redux/ownedPlantSlice";
import { useState } from "react";

interface TEditablePlantInfoProps {
  buttonText: string;
  Child: (inEdit: string) => React.ReactNode;
  index: number;
  plantId: number;
  plantIndex: number;
  saveItems?: () => void;
}

export const EditablePlantInfo: React.FC<TEditablePlantInfoProps> = ({
  buttonText,
  Child,
  index,
  plantIndex,
  saveItems,
}) => {
  const [mode, setMode] = useState<string>("basic");
  const dispatch = useDispatch();

  const handleExpand = () => {
    setMode("expanded");
    dispatch(setEditIndex({ editIndex: index, plantIndex: plantIndex }));
    dispatch(setAnimClass({ editIndex: index, plantIndex: plantIndex }));
  };

  const handleCollapse = () => {
    setMode("basic");
    dispatch(removeEditIndex(plantIndex));
    setTimeout(() => {
      dispatch(setAnimClass({ editIndex: 0, plantIndex }));
    }, 300);
  };

  const handleEdit = () => {
    setMode("edit");
  };
  const handleSave = () => {
    setMode("expanded");
    saveItems && saveItems();
  };
  const handleCancel = () => {
    setMode("expanded");
  };

  return (
    <div
      className={`flex justify-center flex-col transition-all duration-300 ${
        mode !== "basic" ? "min-w-64 min-h-28" : "min-w-10 min-h-10"
      }`}
    >
      {Child(mode)}
      {mode !== "basic" ? (
        <div className="flex flex-row  justify-center">
          {mode === "edit" ? (
            <>
              <button
                onClick={handleSave}
                className="text-text-green font-bold hover:bg-green bg-green bg-opacity-55 px-3 py-0.5 rounded-sm active:scale-95"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="text-text-green font-bold hover:bg-green bg-green bg-opacity-55 px-3 py-0.5 rounded-sm active:scale-95"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="text-text-green font-bold hover:bg-green bg-green bg-opacity-55 px-3 py-0.5 rounded-sm active:scale-95"
              >
                Edit
              </button>{" "}
              <button
                onClick={handleCollapse}
                className="text-text-green font-bold hover:bg-green bg-green bg-opacity-55 px-3 py-0.5 rounded-sm active:scale-95"
              >
                Hide
              </button>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={handleExpand}
          className="text-text-green font-bold hover:bg-green bg-green bg-opacity-55 px-3 py-0.5 rounded-sm active:scale-95"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};
