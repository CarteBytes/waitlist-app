import React from "react";

function FooterLogoCTA() {
  return (
    <div className="flex flex-col items-center justify-center bg-[#F6FE9B] text-black">
      <div className="flex items-center py-3.5">
        <label className="mr-2.5 font-semibold">
          made with <span className="tracking-tighter">{"<3"}</span> by
        </label>
        <img src="/logo.svg" className="h-12 w-auto" />
      </div>
    </div>
  );
}

export default FooterLogoCTA;
