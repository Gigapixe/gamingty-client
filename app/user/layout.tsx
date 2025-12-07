import { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dashboard",
    description: "Manage your account and view your orders.",
  };
}

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="flex">
        {/* <SideNav /> */}
        <div className="flex-1">
          {/* <Navbar /> */}
          <main className="p-4 md:min-h-[calc(100vh-120px)] bg-background-light dark:bg-background-dark">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
