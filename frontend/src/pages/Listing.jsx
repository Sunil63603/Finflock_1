// -------------------------------------------------
// File: src/pages/Listing.jsx
// Purpose: Product listing placeholder to verify theme + transitions
// - Shows a hero card and a few placeholder product cards.
// - Real product grid, skeletons, stepper, etc. will come next steps.
// -------------------------------------------------

import React from "react";
import { motion } from "framer-motion";
import { motionTokens } from "../lib/motion";

import { Button } from "../components/ui/button";
import { toast } from "sonner";

import { useCart } from "../context/CartContext";
import ProductCard from "../components/product/ProductCard";
import ProductCardSkeleton from "../components/product/ProductCard.skeleton";

import MiniCartTray from "../components/cart/MiniCartTray";

//mock data
const mockProducts = Array.from({ length: 12 }).map((_, i) => ({
  id: `p-${i + 1}`,
  title: [
    "Bananas - Yelakki",
    "Amul Toned Milk",
    "Tomatoes - Hybrid",
    "Potato Pack",
    "Apple - Royal Gala",
    "Bread - Whole Wheat",
    "Coke 750ml",
    "Basmati Rice 1kg",
    "Onion 1kg",
    "Parle-G Family Pack",
    "Yogurt Cup 400g",
    "Mango - Alphonso",
  ][i % 12],
  image: `https://picsum.photos/seed/product-${i}/400/400`,
  piecesLabel: ["6 pcs", "500 g", "1 kg", "1 L"][i % 4],
  mrp: [50, 65, 110, 199][i % 4],
  price: [39, 52, 89, 149][i % 4],
  discountPct: [22, 20, 19, 25][i % 4],
  etaMinutes: 10 + (i % 6) * 2,
  inCartQty: 0,
}));

function PlaceholderCard({ i }) {
  const demoToast = () =>
    toast.success("Added to cart", { description: "Will arive in 15 mins" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: motionTokens.durations.card,
        ease: motionTokens.easing.standard,
        delay: i * 0.04,
      }}
      className="rounded-2xl border bg-white p-4 shadow-soft"
    >
      <div className="h-28 rounded-xl bg-muted mb-3"></div>
      <div className="h-3 w-3/4 bg-muted rounded mb-2"></div>
      <div className="h-3 w-1/2 bg-muted rounded"></div>
    </motion.div>
  );
}

export default function Listing() {
  const [items, setItems] = React.useState(mockProducts);
  const { addItem, removeItem, getQty } = useCart();

  const [visibleCount, setVisibleCount] = React.useState(8);

  const view = React.useMemo(
    () =>
      mockProducts.slice(0, visibleCount).map((p) => ({
        ...p,
        inCartQty: getQty(p.id),
      })),
    [mockProducts, visibleCount, getQty]
  );

  const onAdd = (p) => addItem(p);

  const onRemove = (p) => removeItem(p);

  return (
    <>
      <div className="space-y-6">
        {/* Promo/Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: motionTokens.easing.entrance }}
          className="rounded-2xl border bg-white p-6 shadow-lift"
        >
          <h2 className="text-xl font-semibold mb-1">Delivered in minutes</h2>
          <p className="text-sm text-muted-foreground">
            Fresh groceries & snacks at your doorstep.
          </p>
        </motion.div>

        {/* Placeholder grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {view.length === 0
            ? Array.from({ length: 8 }).map((_, idx) => (
                <ProductCardSkeleton key={`s-${idx}`} />
              ))
            : view.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: (Number(p.id.split("-")[1]) % 8) * 0.02,
                  }}
                >
                  <ProductCard product={p} onAdd={onAdd} onRemove={onRemove} />
                </motion.div>
              ))}
        </div>

        {visibleCount < mockProducts.length && (
          <div className="flex justify-center mt-5">
            <motion.div whileHover={{ y: 1 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() =>
                  setVisibleCount((c) => Math.min(c + 8, mockProducts.length))
                }
                className="rounded-full h-11 px-6 shadow-soft bg-[--grad-accent-start] bg-gradient-to-br from-[--grad-accent-start] to-[--grad-accent-end] text-[oklch(0.18_0.02_95)]"
              >
                Load more
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}
