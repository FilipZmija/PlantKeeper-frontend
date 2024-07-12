import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOwnedPlant } from "../types/plants";

// Define the initial state interface
interface OwnedPlantState {
  inEdit: boolean;
  inEditIndex: number;
  editIndex: number;
  animClassSelected: string;
  animClassRest: string;
}
interface OwnedPlantSlice {
  editMode: OwnedPlantState[];
  ownedPlants: TOwnedPlant[];
}

// Define the initial state
const initialState: OwnedPlantSlice = {
  editMode: [],
  ownedPlants: [],
};

// Create the slice
const ownedPlantSlice = createSlice({
  name: "ownedPlant",
  initialState,
  reducers: {
    editOwnedPlant: (
      state,
      action: PayloadAction<{
        key: keyof TOwnedPlant;
        value: string | number | null;
        id: number;
      }>
    ) => {
      const index = state.ownedPlants.findIndex(
        (plant) => plant.id === action.payload.id
      );
      state.ownedPlants[index] = {
        ...state.ownedPlants[index],
        [action.payload.key]: action.payload.value,
      };
    },
    setOwnedPlants: (state, action: PayloadAction<TOwnedPlant[]>) => {
      state.ownedPlants = action.payload;
      state.editMode = action.payload.map((item) => {
        return {
          inEdit: false,
          editIndex: 0,
          inEditIndex: 0,
          animClassSelected: "justify-between items-center",
          animClassRest: "opacity-0",
        };
      });
    },
    addOwnedPlant: (state, action: PayloadAction<TOwnedPlant>) => {
      state.ownedPlants.push(action.payload);
      state.editMode.push({
        inEdit: false,
        editIndex: 0,
        inEditIndex: 0,
        animClassSelected: "justify-between items-center",
        animClassRest: "opacity-0",
      });
    },
    setEditIndex: (
      state,
      action: PayloadAction<{ editIndex: number; plantIndex: number }>
    ) => {
      const { editIndex, plantIndex } = action.payload;
      console.log(editIndex, plantIndex);
      state.editMode[plantIndex] = {
        ...state.editMode[plantIndex],
        inEdit: true,
        inEditIndex: editIndex,
        editIndex: editIndex,
      };
    },
    removeEditIndex: (state, action: PayloadAction<number>) => {
      const plantIndex = action.payload;
      state.editMode[plantIndex] = {
        ...state.editMode[plantIndex],
        editIndex: 0,
      };
    },

    setAnimClass: (
      state,
      action: PayloadAction<{ editIndex: number; plantIndex: number }>
    ) => {
      const { plantIndex, editIndex } = action.payload;
      const animClasses = [
        "justify-between items-center",
        "justify-start",
        "items-center justify-end",
        "items-center justify-end",
      ];
      const animOpacityClass = ["opacity-0", "opacity-100"];
      state.editMode[plantIndex].animClassSelected = animClasses[editIndex];
      state.editMode[plantIndex].animClassRest =
        animOpacityClass[editIndex === 0 ? 1 : 0];
      state.editMode[plantIndex].inEdit = editIndex === 0 ? false : true;
      state.editMode[plantIndex].inEditIndex = editIndex === 0 ? 0 : editIndex;
    },
  },
});
export const {
  setEditIndex,
  removeEditIndex,
  setAnimClass,
  setOwnedPlants,
  editOwnedPlant,
  addOwnedPlant,
} = ownedPlantSlice.actions;

export default ownedPlantSlice.reducer;
