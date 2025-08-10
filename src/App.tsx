// @ts-nocheck

//Purpose:Define routes and implement page transitions

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { motionTokens } from "./lib/motion";
import AppShell from "./components/layout/AppShell";
import Listing from "./pages/Listing";
import Cart from "./pages/Cart";

//Simple variants for page transitions
const pageVariants = {
  initial: { opacity: 0, y: 14, scale: 0.985 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -10, scale: 0.985 },
};

export default function App() {
  const location = useLocation(); //track route changes for transitions

  return (
    <AppShell>
      {/* AnimatePresence enables exit animations on route changes */}
      <AnimatePresence mode="wait">
        {/* key on pathname ensures distinct transitions per route */}
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={{
            duration: 0.55,
            ease: motionTokens.easing.standard,
          }}
          className="min-h-[60vh]"
        >
          <Routes location={location}>
            <Route path="/" element={<Listing />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}
