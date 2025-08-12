//Purpose: Premium cart page with backend integration

import React from "react";
import { motion } from "framer-motion";
import { motionTokens } from "../lib/motion";
import {
  ShoppingBag,
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  Truck,
  Clock,
  Shield,
  CreditCard,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCart,
  setCartQty,
  removeCartItem,
  clearCart,
} from "../lib/api.js";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { toast } from "sonner";

const formatMoney = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

export default function Cart() {
  const [cart, setCart] = useState({ items: [], subtotal: 0, totalItems: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load cart data
  const loadCart = async () => {
    setLoading(true);
    try {
      const cartData = await fetchCart();
      setCart(cartData);
    } catch (error) {
      console.error("Failed to load cart:", error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Update item quantity
  const updateItemQty = async (productId, qty) => {
    try {
      const updatedCart = await setCartQty(productId, qty);
      setCart(updatedCart);
      toast.success("Cart updated successfully");
    } catch (error) {
      console.error("Failed to update cart:", error);
      toast.error("Failed to update cart");
      // Reload cart to ensure consistency
      loadCart();
    }
  };

  // Remove item from cart
  const removeItem = async (productId) => {
    try {
      const updatedCart = await removeCartItem(productId);
      setCart(updatedCart);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error("Failed to remove item");
      loadCart();
    }
  };

  // Clear entire cart
  const handleClearCart = async () => {
    try {
      await clearCart();
      setCart({ items: [], subtotal: 0, totalItems: 0 });
      toast.success("Cart cleared successfully");
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (cart.totalItems <= 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
      >
        {/* Enhanced Empty State */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 shadow-soft"
        >
          <ShoppingBag size={48} className="text-primary" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-foreground mb-3"
        >
          Your cart is empty
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mb-8 max-w-md"
        >
          Looks like you haven't added any items yet. Start shopping to fill
          your cart with fresh groceries!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => navigate("/")}
            className="rounded-2xl px-8 py-3 bg-gradient-to-r from-primary via-primary-500 to-primary-600 text-white font-semibold shadow-glow hover:shadow-glow-accent transition-all duration-300 relative overflow-hidden group"
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              <Plus size={20} />
              Start Shopping
            </span>
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="flex items-center gap-4"
      >
        <motion.div
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="h-12 w-12 rounded-2xl hover:bg-primary/10 transition-colors duration-200"
          >
            <ArrowLeft size={24} className="text-primary" />
          </Button>
        </motion.div>

        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-foreground"
          >
            Shopping Cart
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            {cart.totalItems} item{cart.totalItems > 1 ? "s" : ""} in your cart
          </motion.p>
        </div>

        {/* Cart Icon with Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-glow">
            <ShoppingBag size={32} className="text-white" />
          </div>
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold shadow-glow-accent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            {cart.totalItems}
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-semibold text-foreground"
            >
              Cart Items
            </motion.div>
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-red-600 hover:bg-red-50 border-red-200"
            >
              Clear Cart
            </Button>
          </div>

          {cart.items.map((item, idx) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.5 + idx * 0.1,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-soft hover:shadow-lift transition-all duration-500 bg-white rounded-3xl relative">
                {/* Premium Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start gap-4">
                    {/* Enhanced Product Image */}
                    <motion.div
                      className="relative flex-shrink-0"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-3 flex items-center justify-center shadow-soft">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-contain"
                          draggable="false"
                        />
                      </div>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <motion.h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                        {item.product.title}
                      </motion.h3>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                        <Badge className="rounded-full px-3 py-1 bg-gradient-to-r from-accent/10 to-accent/20 text-accent border border-accent/20 w-fit">
                          {item.product.piecesLabel}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Unit: {formatMoney(item.product.price)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() =>
                                updateItemQty(item.product.id, item.qty - 1)
                              }
                              className="h-9 w-9 rounded-full border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                            >
                              <Minus size={16} className="text-primary" />
                            </Button>
                          </motion.div>

                          <motion.div
                            className="min-w-12 text-center text-lg font-bold text-primary bg-primary/5 rounded-xl px-3 py-1"
                            key={`${item.product.id}-${item.qty}`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            {item.qty}
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              size="icon"
                              onClick={() =>
                                updateItemQty(item.product.id, item.qty + 1)
                              }
                              className="h-9 w-9 rounded-full bg-gradient-to-r from-primary to-primary-600 text-white shadow-glow hover:shadow-glow-accent transition-all duration-200"
                            >
                              <Plus size={16} />
                            </Button>
                          </motion.div>
                        </div>

                        {/* Price Display */}
                        <div className="text-left sm:text-right">
                          <div className="text-lg font-bold text-foreground">
                            {formatMoney(item.product.price * item.qty)}
                          </div>
                          {item.product.mrp > item.product.price && (
                            <div className="text-sm text-muted-foreground line-through">
                              {formatMoney(item.product.mrp * item.qty)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex-shrink-0"
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeItem(item.product.id)}
                        className="h-10 w-10 rounded-full hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-24 border-0 shadow-lift bg-white rounded-3xl overflow-hidden">
            {/* Premium Header */}
            <CardHeader className="bg-gradient-to-br from-primary/5 via-white to-accent/5 border-b border-border/50">
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <Sparkles size={20} className="text-primary" />
                Order Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({cart.totalItems} items)
                  </span>
                  <span className="font-medium text-foreground">
                    {formatMoney(cart.subtotal)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium text-foreground text-green-600">
                    Free
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="font-medium text-foreground">
                    {formatMoney(Math.round(cart.subtotal * 0.05))}
                  </span>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-2xl bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
                    {formatMoney(
                      cart.subtotal + Math.round(cart.subtotal * 0.05)
                    )}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                {[
                  {
                    icon: Truck,
                    text: "Free delivery in 15 minutes",
                    color: "primary",
                  },
                  { icon: Shield, text: "Quality guaranteed", color: "accent" },
                  { icon: Clock, text: "Fresh from farm", color: "primary" },
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div
                      className={`w-8 h-8 rounded-full bg-${feature.color}/10 flex items-center justify-center`}
                    >
                      <feature.icon
                        size={16}
                        className={`text-${feature.color}`}
                      />
                    </div>
                    <span className="text-muted-foreground">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Checkout Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary via-primary-500 to-primary-600 text-white font-bold text-lg shadow-glow hover:shadow-glow-accent transition-all duration-300 relative overflow-hidden group">
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-3">
                    <CreditCard size={24} />
                    Proceed to Checkout
                  </span>
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </motion.div>

              {/* Security Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-full px-3 py-2">
                  <Shield size={14} className="text-primary" />
                  Secure checkout with SSL encryption
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
