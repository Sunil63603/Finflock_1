//Purpose:Sticky header with logo(left), search(center), cart(right)

//include subtle hover/tap motion and focus-visible rings from global CSS

import React from "react";
import { Search, ShoppingCart } from "lucide-react"; //icons
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { motion } from "framer-motion";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-backdrop-blur:backdrop-blur shadow-soft border-b border-border">
      <div className="container mx-auto w-full max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8 py-3 grid grid-cols-12 items-center gap-3">
        {/* Left:Logo */}
        <div className="col-span-4 md:col-span-3 lg:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2 select-none">
            <span
              className="inline-block w-6 h-6 rounded-md bg-primary"
              aria-hidden="true"
            ></span>
            <span className="font-semibold text-lg tracking-tight">
              FinFlock
            </span>
          </Link>
        </div>

        {/* Center:Search(desktop).On mobile we rely on bottom nav 'Search' page */}
        <div className="hidden md:block md:col-span-7 lg:col-span-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for groceries and more..."
              className="h-11 rounded-2xl pl-10 text-sm bg-input border focus-visible:ring-2 focus-visible:ring-[--color-ring]"
              aria-label="Search products"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
              size={18}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Right:Cart button */}
        <div className="hidden md:block col-span-8 md:col-span-2 lg:col-span-2 flex justify-end">
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => navigate("/cart")}
              className="h-11 rounded-2xl px-5 shadow-soft bg-gradient-to-br from-primary-700 to-primary hover:from-primary hover:to-primary-600 text-primary-foreground transition-all duration-200"
            >
              <ShoppingCart size={18} className="mr-2" />
              Cart
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
