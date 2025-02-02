import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation /> <Header />
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
};

export default RootLayout;
