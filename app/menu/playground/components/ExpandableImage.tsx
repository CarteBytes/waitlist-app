"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ExpandableImage({
  imageUrl,
  name,
  description,
  bgColor,
  textColor,
}: {
  imageUrl: string;
  name: string;
  description?: string;
  bgColor: string;
  textColor: string;
}) {
  const [currentImage, setCurrentImage] = useState("");

  const imageSrc = imageUrl ?? "";

  return (
    <>
      {/* Trigger Image */}
      <img
        alt={name ?? "category-img"}
        src={imageSrc}
        className="mr-2 h-20 w-20 cursor-pointer rounded-sm"
        onClick={() => setCurrentImage(imageSrc)}
      />

      {/* Dialog */}
      {currentImage && (
        <Dialog
          open={Boolean(currentImage)}
          onOpenChange={() => setCurrentImage("")}>
          <DialogContent style={{ background: bgColor, color: textColor }}>
            <DialogHeader>
              <DialogTitle>{name ?? "Expanded Image"}</DialogTitle>
            </DialogHeader>
            <div>
              {!!description && (
                <p className="mb-4 opacity-80">{description}</p>
              )}
              <div className="flex justify-center">
                <img
                  src={currentImage}
                  alt={name ?? "Expanded Image"}
                  className="max-h-[80vh] max-w-full"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
