import React from "react";

function FooterLogoCTA({ lang = "eng" }: { lang?: "eng" | "esp" }) {
  return (
    <a target="_blank" href="https://cartebytes.com/" rel="noopener noreferrer">
      <div className="flex flex-col items-center justify-center bg-[#F6FE9B] text-black">
        <div className="flex items-center py-3.5">
          <label className="mr-2.5 font-semibold">
            {lang === "esp" ? (
              <>
                Hecho con <span className="tracking-tighter">{"<3"}</span> por
              </>
            ) : (
              <>
                made with <span className="tracking-tighter">{"<3"}</span> by
              </>
            )}
          </label>
          <img src="/logo.svg" className="h-12 w-auto" />
        </div>
      </div>
    </a>
  );
}

export default FooterLogoCTA;
