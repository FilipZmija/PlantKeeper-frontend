import React, { useState, ChangeEvent, useRef, useEffect } from "react";

type TUploadImage = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
};

const UploadImage: React.FC<TUploadImage> = ({
  file,
  setFile,
  image,
  setImage,
  loading,
}) => {
  const ref = useRef<HTMLImageElement>(null);
  const [imageSize, setImageSize] = useState({ width: 384, height: 384 });
  const [isPicture, setIsPicture] = useState(false);
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
        setFile(selectedFile);
      };

      reader.readAsDataURL(selectedFile);
    } else {
      alert("Please upload a valid image file");
    }
  };
  useEffect(() => {
    if (!image) {
      setTimeout(() => setImageSize({ width: 384, height: 384 }), 100);
    } else setIsPicture(true);
    if (ref.current) {
      setTimeout(() => {
        setImageSize({
          width: ref.current?.width ?? 0,
          height: ref.current?.height ?? 0,
        });
      }, 1000);
    }
  }, [image]);

  return (
    <div
      className={`flex flex-col items-center justify-center transition-all duration-1000 ${
        image ? "h-96 min-w-24" : "h-52 min-w-96"
      }`}
    >
      {!image ? (
        <label
          style={{
            width: ` ${imageSize.width + "px"}`,
          }}
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-green hover:bg-lightgreen transition-all duration-1000`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
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
        <div className="inline-flex justify-center relative w-full h-full">
          <img
            ref={ref}
            src={image}
            alt="Uploaded"
            className={`rounded-lg max-h-full max-w-full `}
          />
          {loading && (
            <div className="absolute inset-0 overflow-hidden rounded-lg w-full ">
              <div className="flex absolute inset-0 after:w-full after:h-2 after:absolute after:bg-text-green after:opacity-100 animate-scan after:shadow-custom-dark ">
                <div className="bg-text-green opacity-40 w-full h-full mt-2"></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
