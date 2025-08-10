import React from "react";
import { useCart } from "../../context/CartContext";
import { money } from "../../lib/price";
import { Separator } from "../ui/separator";

const deliveryFeeFor = (subtotal) => (subtotal >= 199 ? 0 : 25);

export default function PriceSummary({ appliedCoupon }) {
  const { subtotal } = useCart();

  const couponOff = appliedCoupon
    ? Math.round(subtotal * appliedCoupon.pct)
    : 0;
  const delivery = deliveryFeeFor(subtotal - couponOff);
  const toPay = Math.max(0, subtotal - couponOff + delivery);

  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="text-sm font-semibold mb-3">Price details</div>

      <div className="flex items-center justify-between text-sm py-1">
        <span>Subtotal</span>
        <span>{money(subtotal)}</span>
      </div>

      <div className="flex items-center justify-between text-sm py-1">
        <span>Coupon</span>
        <span
          className={
            couponOff ? "text-primary font-medium" : "text-muted-foreground"
          }
        >
          {couponOff ? `- ${money(couponOff)}` : "—"}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm py-1">
        <span>Delivery</span>
        <span className={delivery === 0 ? "text-primary font-medium" : ""}>
          {delivery === 0 ? "Free" : money(delivery)}
        </span>
      </div>

      <Separator className="my-3" />

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Total</span>
        <span className="text-base font-semibold">{money(toPay)}</span>
      </div>
    </div>
  );
}
