import axios, { AxiosResponse } from "axios";
import React from "react";
import { TPlant } from "../types/plants";
import UploadImage from "./UploadImage";

type UploadIdentificationProps = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIdentifiedPlant: React.Dispatch<React.SetStateAction<TPlant | null>>;
  handleDiscard: () => void;
  setFileName: React.Dispatch<React.SetStateAction<string | null>>;
};
export default function UploadIdentification({
  file,
  setFile,
  image,
  setImage,
  loading,
  setLoading,
  setIdentifiedPlant,
  handleDiscard,
  setFileName,
}: UploadIdentificationProps) {
  const handleIdentify = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response: AxiosResponse<{ filename: string; result: TPlant[] }> =
        await axios.post(
          `${process.env.REACT_APP_API_URL}/plants/identify`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      const plantData = response.data.result[0];
      setIdentifiedPlant(plantData);
      setFileName(response.data.filename);
      console.log(plantData);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {/* Modal body */}
      <div className="p-4 md:p-5 space-y-4 flex justify-center">
        <UploadImage
          setFile={setFile}
          image={image}
          setImage={setImage}
          loading={loading}
        />
      </div>
      {/* Modal footer */}
      <div className="flex items-center space-x-2 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          onClick={handleIdentify}
          className="text-text-green font-bold hover:bg-green bg-green bg-opacity-55 px-4 py-1 rounded-md active:scale-95"
        >
          Identify
        </button>
        <button
          onClick={handleDiscard}
          className="text-dark-green font-bold hover:bg-green  bg-text-green  px-4 py-1 rounded-md active:scale-95"
        >
          Discard image
        </button>
      </div>
    </div>
  );
}
