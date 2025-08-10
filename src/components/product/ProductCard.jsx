//Purpose: Premium product card with spectacular hover effects and animations

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import { motionTokens } from "../../lib/motion";

const formatMoney = (n) => `${Number(n).toLocaleString("en-IN")}`;

export default function ProductCard({ product, onAdd, onRemove }) {
  const {
    id,
    title = "Fresh Item",
    image = `https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=400&auto=format&fit=crop`,
    piecesLabel = `1 pack`,
    price = 99,
    mrp = 129,
    discountPct = 23,
    etaMinutes = 15,
    inCartQty = 0,
  } = product;

  const { addItem, removeItem, getQty } = useCart();
  const hasDiscount = mrp > price;
  const bumpKey = `${id}-${inCartQty}`;

  const handleAdd = () => {
    // Remove the double call - only call addItem from context
    addItem(product);
  };

  const handleRemove = () => {
    // Remove the double call - only call removeItem from context
    removeItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-soft hover:shadow-lift transition-all duration-500 bg-white rounded-3xl relative">
        {/* Premium Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

        {/* Image Container with Enhanced Effects */}
        <div className="relative overflow-hidden">
          {/* ETA Chip with Glassmorphism */}
          <motion.div
            className="absolute right-3 top-3 z-20"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="glass-premium rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 text-foreground shadow-soft">
              <Timer size={14} className="text-primary" />
              {etaMinutes} min
            </div>
          </motion.div>

          {/* Enhanced Image with Hover Effects */}
          <AspectRatio ratio={1 / 1}>
            <motion.div
              className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="h-full w-full object-contain select-none transition-transform duration-500 group-hover:scale-110"
                draggable="false"
              />

              {/* Premium Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Rating section completely removed as requested */}
            </motion.div>
          </AspectRatio>
        </div>

        {/* Enhanced Content */}
        <CardContent className="p-4 relative z-10">
          {/* Title with Premium Typography */}
          <div className="min-h-[48px] mb-3">
            <motion.div
              className="text-sm font-bold leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {title}
            </motion.div>
            <motion.div
              className="text-xs text-muted-foreground mt-1 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {piecesLabel}
            </motion.div>
          </div>

          {/* Enhanced Price Block */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-foreground">
                ₹{formatMoney(price)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through font-medium">
                  ₹{formatMoney(mrp)}
                </span>
              )}
            </div>

            {/* Premium Add/Remove Buttons */}
            <AnimatePresence mode="wait">
              {inCartQty > 0 ? (
                <motion.div
                  key={bumpKey}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-full px-2 py-1.5 shadow-soft"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleRemove}
                    className="h-8 w-8 rounded-full hover:bg-primary/20 transition-colors duration-200"
                    aria-label={`Decrease ${title}`}
                  >
                    <Minus size={16} className="text-primary" />
                  </Button>
                  <div className="min-w-6 text-center text-sm font-bold tabular-nums text-primary">
                    {inCartQty}
                  </div>
                  <Button
                    size="icon"
                    onClick={handleAdd}
                    className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary-600 text-white shadow-glow hover:shadow-glow-accent transition-all duration-200"
                    aria-label={`Increase ${title}`}
                  >
                    <Plus size={16} />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="shrink-0"
                >
                  <Button
                    onClick={handleAdd}
                    className="h-9 rounded-full px-5 bg-gradient-to-r from-primary via-primary-500 to-primary-600 text-white font-semibold shadow-glow hover:shadow-glow-accent transition-all duration-300 relative overflow-hidden group"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Plus size={16} className="mr-1.5 relative z-10" />
                    <span className="relative z-10">Add</span>
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
