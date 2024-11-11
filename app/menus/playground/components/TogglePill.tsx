import { useState } from "react";

type Option = { label: string; value: string };

const TogglePill = ({
  op1,
  op2,
  op3,
  value,
  handleToggle,
}: {
  op1: Option;
  op2: Option;
  op3: Option;
  value: string;
  handleToggle: (val: string) => void;
}) => {
  return (
    <div className="flex h-12 w-72 cursor-pointer overflow-hidden rounded-full border-2 border-[#F6FE9B] shadow-2xl">
      {/* Left Option */}
      <div
        onClick={() => handleToggle(op1.value)}
        className={`flex flex-[2] items-center justify-center transition-colors duration-300 ${
          value === op1.value
            ? "bg-[#F6FE9B] text-black"
            : "bg-black text-[#F6FE9B]"
        }`}>
        {op1.label}
      </div>

      {/* Middle Option */}
      <div
        onClick={() => handleToggle(op2.value)}
        className={`flex flex-[2] items-center justify-center transition-colors duration-300 ${
          value === op2.value
            ? "bg-[#F6FE9B] text-black"
            : "bg-black text-[#F6FE9B]"
        }`}>
        {op2.label}
      </div>

      {/* Right Option */}
      <div
        onClick={() => handleToggle(op3.value)}
        className={`flex flex-[2] items-center justify-center transition-colors duration-300 ${
          value === op3.value
            ? "bg-[#F6FE9B] text-black"
            : "bg-black text-[#F6FE9B]"
        }`}>
        {op3.label}
      </div>
    </div>
  );
};

export default TogglePill;
