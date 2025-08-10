//Purpose:Reusuable layout shell

//Sticky header with logo+search+cart
//Content container with safe areas
//Mobile bottom nav(Home,Search,Cart)

import React from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";

import { Toaster } from "sonner";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col safe-area-inline">
      {/* Sticky header: stays on top while scrolling */}
      <Header />

      {/* Main content area */}
      <main className="flex-1 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full max-w-6xl py-4">
        {children}
      </main>

      {/* Bottom navigation only visible on small screens */}
      <BottomNav />

      <Toaster
        theme="light"
        position="top-center"
        expand
        richColors
        closeButton
      />
    </div>
  );
}
