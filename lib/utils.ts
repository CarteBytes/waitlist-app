import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(",")[1]); // Get base64 string without prefix
    reader.onerror = (error) => reject(error);
  });

export const retrieveFile = async (
  objectURL: string,
  toBase64: boolean = false,
): Promise<File | string> => {
  try {
    // Fetch the Blob from the Object URL
    const response = await fetch(objectURL);
    const blob = await response.blob();

    // Create a File from the Blob
    const file = new File([blob], "retrieved-file", { type: blob.type });

    if (toBase64) {
      // Convert the File to Base64 if requested
      return await convertToBase64(file);
    }

    return file; // Return the File by default
  } catch (error) {
    console.error("Error retrieving file:", error);
    throw error;
  } finally {
    // Clean up the Object URL
    URL.revokeObjectURL(objectURL);
  }
};

export const isObjectURL = (url: string): boolean => {
  try {
    const parsedURL = new URL(url);
    return parsedURL.protocol === "blob:";
  } catch (error) {
    // If URL constructor throws an error, it's not a valid URL
    return false;
  }
};
