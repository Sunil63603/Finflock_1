//Purpose: Premium sticky header with spectacular effects and glassmorphism

import React from "react";
import { Search, ShoppingCart, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Header() {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl supports-backdrop-blur:backdrop-blur-xl shadow-soft border-b border-border/50"
    >
      <div className="container mx-auto w-full max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 grid grid-cols-12 items-center gap-4">
        {/* Left: Enhanced Logo */}
        <motion.div
          className="col-span-4 md:col-span-3 lg:col-span-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 select-none group"
          >
            <motion.div
              className="relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-glow">
                <Sparkles size={20} className="text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl scale-150"></div>
            </motion.div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
              FinFlock
            </span>
          </Link>
        </motion.div>

        {/* Center: Enhanced Search */}
        <div className="hidden md:block md:col-span-7 lg:col-span-8">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Input
              type="text"
              placeholder="Search for groceries and more..."
              className="h-12 rounded-2xl pl-12 text-sm bg-white/80 backdrop-blur-sm border-2 border-transparent focus:border-primary/30 focus:bg-white transition-all duration-300 shadow-soft focus:shadow-glow"
              aria-label="Search products"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
              aria-hidden="true"
            />
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/60"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Right: Enhanced Cart Button */}
        <div className="hidden md:block col-span-8 md:col-span-2 lg:col-span-2 flex justify-end">
          <motion.div
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button
              onClick={() => navigate("/cart")}
              className="h-12 rounded-2xl px-6 bg-gradient-to-r from-primary via-primary-500 to-primary-600 text-white font-semibold shadow-glow hover:shadow-glow-accent transition-all duration-300 relative overflow-hidden group"
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ShoppingCart size={20} className="mr-2 relative z-10" />
              <span className="relative z-10">Cart</span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
