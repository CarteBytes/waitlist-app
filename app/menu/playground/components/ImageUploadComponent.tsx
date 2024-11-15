"use client";

import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";

function ImageUploadComponent({
  file_,
  onFileChange,
}: {
  file_?: string;
  onFileChange?: (newFile: File | null) => void;
}) {
  const [fileStr, setFileStr] = useState<string | null>(file_ ?? null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (onFileChange) {
      onFileChange(file);
    }
  }, [file]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFileStr(URL.createObjectURL(e.target.files[0]) as string);
    }
  };

  const handleRemoveFile = (e: any) => {
    e.preventDefault();
    if (fileStr) {
      URL.revokeObjectURL(fileStr);
    }
    setFile(null);
    setFileStr(null);
  };

  return (
    <div>
      <p className="mb-3 text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Image
      </p>
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex min-h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-black">
          {fileStr ? (
            <img
              alt="upload-component-image"
              src={fileStr}
              className="h-auto object-contain p-1"
            />
          ) : (
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-black">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-600">Max 1MB</p>
            </div>
          )}
          <input
            id="dropzone-file"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="mt-1 flex justify-end">
        <button
          disabled={!fileStr}
          className="flex items-center gap-2 rounded-lg text-sm underline disabled:text-gray-500"
          onClick={(e) => handleRemoveFile(e)}>
          Remove Image
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default ImageUploadComponent;
