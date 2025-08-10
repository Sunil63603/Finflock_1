//Purpose:Sticky bottom tray with frosted glass, subtotal,and CTA.

import React from "react";
import { useCart } from "../../context/CartContext";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { money } from "../../lib/price";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MiniCartTray() {
  const { subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  if (totalItems <= 0) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 bottom-2 z-40"
      role="region"
      aria-label="Mini cart summary"
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="glass rounded-2xl shadow-lift border flex items-center justify-between gap-3 px-3 sm:px-4 py-2.5">
          <div className="flex items-center gap-2 text-sm">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-primary/15 text-primary">
              <ShoppingCart size={18} aria-hidden="true" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold">{money(subtotal)}</div>
              <div className="text-[12px] text-muted-foreground">
                {totalItems} item{totalItems > 1 ? "s" : ""} • taxes & delivery
                at checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
