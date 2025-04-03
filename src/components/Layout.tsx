import { PropsWithChildren } from "react";
import { useLocation } from "wouter";
import { NavBar } from "./NavBar";
import { Breadcrumb } from "./Breadcrumb";

export function Layout({ children }: PropsWithChildren) {
  const [location] = useLocation();
  const showBreadcrumb = location !== "/";

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {showBreadcrumb && (
            <div className="mb-4">
              <Breadcrumb />
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
