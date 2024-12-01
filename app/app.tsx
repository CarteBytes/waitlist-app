"use client";

import React from "react";
import { AuthProvider } from "./context/useAuth";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";

function App({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster richColors position="top-center" />
      <Analytics />
    </AuthProvider>
  );
}

export default App;
