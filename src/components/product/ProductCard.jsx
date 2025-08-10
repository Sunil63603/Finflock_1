//shadc(Card,Badge,AspectRatio,Button),framer-motion,sonner

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { motionTokens } from "../../lib/motion";

//shadcn primitives
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { toast } from "sonner";

//Icons
import { Plus, Minus, Timer } from "lucide-react";

//Helpers
const formatMoney = (n) => `${Number(n).toLocaleString("en-IN")}`;

export default function ProductCard({ product, onAdd, onRemove }) {
  //Defensive defaults
  const {
    id,
    title = "Fresh Item",
    image = `https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=400&auto=format&fit=crop`,
    piecesLabel = `1 pack`,
    price = 99,
    mrp = 129,
    discountPct = Math.max(
      0,
      Math.round((1 - price / Math.max(mrp, price)) * 100)
    ),
    etaMinutes = 15,
    inCartQty = 0,
  } = product || {};

  const hasDiscount = useMemo(
    () => Number(discountPct) > 0 && mrp > price,
    [discountPct, mrp, price]
  );

  // Small bump when qty changes (pairs with global .bump class)
  const bumpKey = `${id}-${inCartQty}`;

  // Add / Remove with feedback ------------------------------------------------
  const handleAdd = () => {
    onAdd?.(product);
    toast.success("Added to cart", {
      description: `${title} • arrives in ~${etaMinutes} min`,
      duration: 1400,
    });
  };

  const handleRemove = () => {
    onRemove?.(product);
    if (inCartQty <= 1) {
      toast("Removed", {
        description: `${title} removed from cart`,
        duration: 1200,
      });
    }
  };

  return (
    <motion.div
      // Outer motion wrapper: subtle lift on hover, tap compression on mobile
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: motionTokens.durations.hover,
        ease: motionTokens.easing.standard,
      }}
      className="hover-elevate"
    >
      <Card className="rounded-2xl overflow-hidden border bg-white shadow-soft">
        {/* Image Area */}
        <div className="relative">
          {/* Discount badge(top-left) */}
          {hasDiscount && (
            <Badge
              // bg as a brand gradient for pop; readable foreground via Badge style
              className="absolute left-2 top-2 z-10 rounded-full px-2.5 py-1 text-[11px] font-semibold bg-white text-[oklch(0.18_0.02_95)] shadow-soft"
            >
              {discountPct}% OFF
            </Badge>
          )}

          {/* ETA chip (top-right) */}
          <div className="absolute right-2 top-2 z-10">
            <div className="glass rounded-full px-2.5 py-1 text-[11px] font-medium flex items-center gap-1">
              <Timer size={14} aria-hidden="true" />
              {etaMinutes} min
            </div>
          </div>

          {/* AspectRatio ensures consistent 1:1 tiles; image is lazy for perf */}
          <AspectRatio ratio={1 / 1}>
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover select-none"
              draggable="false"
            />
          </AspectRatio>
        </div>

        {/* ===== CONTENT ======================================================= */}
        <CardContent className="p-3">
          {/* Title + pieces/pack */}
          <div className="min-h-[44px] mb-1">
            <div className="text-[13px] font-semibold leading-tight line-clamp-2">
              {title}
            </div>
            <div className="text-[12px] text-muted-foreground mt-0.5">
              {piecesLabel}
            </div>
          </div>

          {/* Price block: current + MRP strike */}
          <div className="flex items-end justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[15px] font-semibold text-foreground">
                {formatMoney(price)}
              </span>
              {hasDiscount && (
                <span className="text-[12px] text-muted-foreground line-through">
                  {formatMoney(mrp)}
                </span>
              )}
            </div>

            {/* === ADD / STEPPER ============================================= */}
            {inCartQty > 0 ? (
              <motion.div
                key={bumpKey}
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.25,
                  ease: motionTokens.easing.entrance,
                }}
                className="flex items-center gap-1 bg-background border rounded-full px-1.5 py-1 shadow-soft"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleRemove}
                  className="h-7 w-7 rounded-full"
                  aria-label={`Decrease ${title}`}
                >
                  <Minus size={16} />
                </Button>
                <div className="min-w-6 text-center text-[12px] font-medium tabular-nums">
                  {inCartQty}
                </div>
                <Button
                  size="icon"
                  onClick={handleAdd}
                  className="h-7 w-7 rounded-full bg-[--grad-primary-start] bg-gradient-to-br from-[--grad-primary-start] to-[--grad-primary-end] text-primary-foreground"
                  aria-label={`Increase ${title}`}
                >
                  <Plus size={16} />
                </Button>
              </motion.div>
            ) : (
              <motion.div whileTap={{ scale: 0.98 }} className="shrink-0">
                <Button
                  onClick={handleAdd}
                  className="h-8 rounded-full px-4 bg-[--grad-primary-start] bg-gradient-to-br from-[--grad-primary-start] to-[--grad-primary-end] text-primary-foreground shadow-soft"
                  aria-label={`Add ${title} to cart`}
                >
                  <Plus size={16} className="mr-1" /> Add
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
