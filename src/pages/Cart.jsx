//Purpose:Cart placeholder to validate routing + Transitions

import React from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { motionTokens } from "../lib/motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { money } from "../lib/price";

//Local Cart components
import MiniCartTray from "../components/cart/MiniCartTray";
import CartItem from "../components/cart/CartItem";
import PriceSummary from "../components/cart/PriceSummary";
import DeliverySlotDialog from "../components/cart/DeliverySlotDialog";

//shadcn components
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";

export default function Cart() {
  const { items, totalItems, subtotal } = useCart();
  const navigate = useNavigate();

  // Coupon state (client-side mock)
  const [coupon, setCoupon] = React.useState("");
  const [appliedCoupon, setAppliedCoupon] = React.useState(null);

  const onApplyCoupon = (code) => {
    const clean = (code || coupon).trim().toUpperCase();
    if (!clean) return;
    // demo: flat 10% off for code 'SAVE10', 15% for 'GROCER15'
    const map = { SAVE10: 0.1, GROCER15: 0.15 };
    const pct = map[clean];
    if (pct) setAppliedCoupon({ code: clean, pct });
    else setAppliedCoupon(null);
  };

  // Delivery slot dialog control
  const [slotOpen, setSlotOpen] = React.useState(false);
  const [slot, setSlot] = React.useState(null);

  // Turn Map -> array for render
  const lineItems = React.useMemo(() => {
    const arr = [];
    items.forEach(({ product, qty }) => arr.push({ product, qty }));
    return arr;
  }, [items]);

  const isEmpty = totalItems <= 0;

  return (
    <>
      <div className="space-y-5">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Your Cart</h1>
          {!isEmpty && (
            <div className="text-sm text-muted-foreground">
              {totalItems} item{totalItems > 1 ? "s" : ""} • {money(subtotal)}
            </div>
          )}
        </div>

        {/* Empty state */}
        <AnimatePresence initial={false}>
          {isEmpty ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-2xl border bg-white p-8 shadow-soft text-center"
            >
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/15 mb-3" />
              <h2 className="text-lg font-semibold mb-1">Your cart is empty</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Add tasty things from the listing page.
              </p>
              <Button
                onClick={() => navigate("/")}
                className="rounded-full px-6 bg-[--grad-primary-start] bg-gradient-to-br from-[--grad-primary-start] to-[--grad-primary-end] text-primary-foreground shadow-soft"
              >
                Browse products
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="full"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-5"
            >
              {/* Left: Line items */}
              <section className="lg:col-span-2 rounded-2xl border bg-white shadow-soft">
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-semibold">Items</h2>
                  </div>

                  <div className="divide-y">
                    {lineItems.map(({ product, qty }, i) => (
                      <CartItem
                        key={product.id}
                        product={product}
                        qty={qty}
                        index={i}
                      />
                    ))}
                  </div>

                  {/* Coupon row */}
                  <div className="mt-5 rounded-xl border bg-background p-3">
                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                      <Input
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Have a coupon? Try SAVE10 or GROCER15"
                        className="h-10 rounded-xl"
                        aria-label="Coupon code"
                      />
                      <Button
                        onClick={() => onApplyCoupon()}
                        className="h-10 rounded-xl bg-[--grad-accent-start] bg-gradient-to-br from-[--grad-accent-start] to-[--grad-accent-end] text-[oklch(0.18_0.02_95)]"
                      >
                        Apply
                      </Button>
                    </div>

                    {appliedCoupon ? (
                      <div className="text-xs text-primary mt-2 font-medium">
                        Applied: {appliedCoupon.code} —{" "}
                        {Math.round(appliedCoupon.pct * 100)}% off
                      </div>
                    ) : coupon ? (
                      <div className="text-xs text-muted-foreground mt-2">
                        Invalid or unsupported code.
                      </div>
                    ) : null}
                  </div>
                </div>
              </section>

              {/* Right: Summary + Delivery slot */}
              <aside className="rounded-2xl border bg-white shadow-soft p-4 sm:p-5 h-max lg:sticky lg:top-20">
                <PriceSummary appliedCoupon={appliedCoupon} />

                <Separator className="my-4" />

                {/* Delivery slot */}
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Delivery</div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      {slot ? slot.label : "Choose a delivery slot"}
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => setSlotOpen(true)}
                    >
                      Select slot
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                <Button className="w-full h-11 rounded-xl bg-[--grad-primary-start] bg-gradient-to-br from-[--grad-primary-start] to-[--grad-primary-end] text-primary-foreground shadow-soft">
                  Proceed to Checkout
                </Button>
              </aside>
            </motion.div>
          )}
        </AnimatePresence>

        <DeliverySlotDialog
          open={slotOpen}
          onOpenChange={setSlotOpen}
          slot={slot}
          setSlot={setSlot}
        ></DeliverySlotDialog>
      </div>
      <MiniCartTray />
    </>
  );
}
