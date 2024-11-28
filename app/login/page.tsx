"use client";

import LoginForm from "../ui/components/LoginForm";
import Particles from "@/components/ui/particles";
import CTA from "@/components/cta";

export default function Page({}: {}) {
  return (
    <main className="flex min-h-dvh flex-col items-center overflow-x-clip pt-12 md:pt-24">
      <section className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* <CTA /> */}
        <LoginForm />
      </section>

      <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#F7FF9B"}
        refresh
      />
    </main>
  );
}
