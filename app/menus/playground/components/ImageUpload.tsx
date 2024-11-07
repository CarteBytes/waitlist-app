// components/ImageUpload.tsx
"use client";

import { useState, ChangeEvent } from "react";

type ImageUploadProps = {
  restaurantId: string;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ restaurantId }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !restaurantId) return;

    // Convert file to base64
    const base64 = await convertToBase64(file);

    const response = await fetch("/api/restaurants/upload_logo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: base64, restaurantId }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Image uploaded successfully:", data);
    } else {
      console.error("Error uploading image:", data.error);
    }
  };

  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(",")[1]); // Get base64 string without prefix
      reader.onerror = (error) => reject(error);
    });

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload Image
      </button>
    </div>
  );
};

export default ImageUpload;
