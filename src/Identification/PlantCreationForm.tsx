import axios from "axios";
import React from "react";

export default function PlantCreationForm() {
  const handleCreate = async (): Promise<void> => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ownedplant/add`,
        {}
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleCreate}>Create plant</button>;
}
