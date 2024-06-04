import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Plant } from "../types/plants";

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [plantInfo, setPlantInfo] = useState<Plant | null>(null);
  const [img, setImg] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/plants/identify`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const plantData = response.data.result[0];
      setPlantInfo(plantData);
      setImg(response.data.filename);
      setMessage(`Plant identified: ${plantData.name}`);

      console.log(response.data);
    } catch (error: any) {
      console.log(error);
      setMessage(
        `File upload failed: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload File</button>
      </form>
    </>
  );
}
