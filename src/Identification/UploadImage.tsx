import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";

const UploadImage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setFile(selectedFile);
      };
      console.log(reader);
      reader.readAsDataURL(selectedFile);
    } else {
      alert("Please upload a valid image file");
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setFile(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
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
      console.log(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center transition-all duration-1000 ${
        image ? "h-96" : "h-48"
      }`}
    >
      {!image ? (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-green hover:bg-lightgreen transition-all duration-1000"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-text-green"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-text-green">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-text-green">SVG, PNG or JPG</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      ) : (
        <>
          <img
            src={image}
            alt="Uploaded"
            className="rounded-lg max-h-full max-w-full"
          />
          <button
            onClick={handleRemoveImage}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Remove Image
          </button>
        </>
      )}
    </div>
  );
};

export default UploadImage;
