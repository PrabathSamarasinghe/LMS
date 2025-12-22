import React, { lazy, Suspense, useState, ReactNode } from "react";
import { useLayoutContext } from "../root.component";

const Slidebar = lazy(() => import("./Slidebar"));
const Header = lazy(() => import("./Header"));

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { role } = useLayoutContext();
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <Slidebar />
      </Suspense>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <Header role={role} />
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">{children}</div>
          </main>
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
