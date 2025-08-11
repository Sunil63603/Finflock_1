//Purpose: Premium sticky cart tray with spectacular glassmorphism and animations

import React from "react";
import { useCart } from "../../context/CartContext";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { money } from "../../lib/price";
import { ShoppingCart, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MiniCartTray() {
  const { subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  if (totalItems <= 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.5,
        }}
        className="fixed inset-x-0 bottom-4 z-50"
        role="region"
        aria-label="Mini cart summary"
      >
        <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            className="glass-premium rounded-3xl shadow-lift border border-white/20 flex items-center justify-between gap-4 px-4 sm:px-6 py-4 relative overflow-hidden"
            whileHover={{ y: -2, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            {/* Left Content */}
            <div className="flex items-center gap-3 text-sm relative z-10">
              <motion.div
                className="relative"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-600 text-white shadow-glow">
                  <ShoppingCart size={20} aria-hidden="true" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-primary-600 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-xl scale-150"></div>
              </motion.div>

              <div className="leading-tight">
                <motion.div
                  className="font-bold text-lg text-foreground"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {money(subtotal)}
                </motion.div>
                <div className="text-xs text-muted-foreground font-medium">
                  {totalItems} item{totalItems > 1 ? "s" : ""} • taxes &
                  delivery at checkout
                </div>
              </div>
            </div>

            {/* Right: Enhanced CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10"
            >
              <Button
                onClick={() => navigate("/")}
                className="rounded-2xl h-11 px-6 bg-gradient-to-r from-primary via-primary-500 to-primary-600 text-white font-semibold shadow-glow hover:shadow-glow-accent transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Add more to Cart
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </span>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </motion.div>

            {/* Floating Sparkles Effect */}
            <motion.div
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={16} className="text-accent" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
