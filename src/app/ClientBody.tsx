"use client";

import { useEffect } from "react";
import AppLoader from "./components/AppLoader";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.className = "antialiased";
  }, []);

  return (
    <div className="antialiased relative min-h-screen">
      <AppLoader />
      {children}
    </div>
  );
}
