import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { money } from "../../lib/price";
import { Button } from "../../components/ui/button";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import { Minus, Plus } from "lucide-react";

export default function CartItem({ product, qty, index }) {
  const { addItem, removeItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{
        duration: 0.25,
        ease: [0.2, 0.8, 0.2, 1],
        delay: index * 0.02,
      }}
      className="flex items-center gap-3 py-3"
    >
      {/* Image */}
      <div className="w-16 shrink-0 rounded-xl overflow-hidden border">
        <AspectRatio ratio={1 / 1}>
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </AspectRatio>
      </div>

      {/* Title + pieces */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{product.title}</div>
        <div className="text-xs text-muted-foreground">
          {product.piecesLabel}
        </div>
      </div>

      {/* Price block */}
      <div className="text-right mr-2">
        <div className="text-sm font-semibold">
          {money(product.price * qty)}
        </div>
        {product.mrp > product.price && (
          <div className="text-[11px] text-muted-foreground line-through">
            {money(product.mrp * qty)}
          </div>
        )}
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-1 bg-background border rounded-full px-1.5 py-1 shadow-soft">
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 rounded-full"
          aria-label={`Decrease ${product.title}`}
          onClick={() => removeItem(product)}
        >
          <Minus size={16} />
        </Button>
        <div className="min-w-6 text-center text-[12px] font-medium tabular-nums">
          {qty}
        </div>
        <Button
          size="icon"
          className="h-7 w-7 rounded-full bg-[--grad-primary-start] bg-gradient-to-br from-[--grad-primary-start] to-[--grad-primary-end] text-primary-foreground"
          aria-label={`Increase ${product.title}`}
          onClick={() => addItem(product)}
        >
          <Plus size={16} />
        </Button>
      </div>
    </motion.div>
  );
}
