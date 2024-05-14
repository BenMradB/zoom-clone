import { Footer, Header, Sidebar } from "@/components/shared";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Header />
      <div className="flex">
        <Sidebar />
        <section
          className="overflow-y-auto flex-1 "
          style={{
            minHeight: "calc(100vh - 130px)",
          }}
        >
          <div className="w-full h-full text-slate-50 px-6 py-8">
            {children}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default HomeLayout;
