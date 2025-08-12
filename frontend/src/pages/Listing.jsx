// -------------------------------------------------
// File: src/pages/Listing.jsx
// Purpose: Product listing with backend integration
// - Fetches products and cart from backend APIs
// - Real-time cart updates
// -------------------------------------------------

import React from "react";
import { motion } from "framer-motion";
import { motionTokens } from "../lib/motion";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchCart,
  setCartQty,
  fetchProduct,
} from "../lib/api.js";
import { useAuth } from "../store/auth";
import ProductModal from "../components/product/ProductModal";

export default function Listing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartMap, setCartMap] = useState(new Map()); // productId -> qty
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuth();

  // Load products and cart data
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await fetchProducts();
        if (!mounted) return;
        setProducts(list);

        // Load cart if user is authenticated
        if (token) {
          const cart = await fetchCart();
          const m = new Map(cart.items.map((i) => [i.product.id, i.qty]));
          setCartMap(m);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        toast.error("Failed to load products");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [token]);

  // Update cart quantity with optimistic UI
  const updateQty = async (productId, nextQty) => {
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }

    // Optimistic UI update
    setCartMap((m) => new Map(m.set(productId, Math.max(0, nextQty))));

    try {
      const cart = await setCartQty(productId, nextQty);
      const m = new Map(cart.items.map((i) => [i.product.id, i.qty]));
      setCartMap(m);

      // Show success feedback
      if (nextQty > 0) {
        toast.success("Cart updated successfully");
      }
    } catch (error) {
      console.error("Failed to update cart:", error);
      toast.error("Failed to update cart");

      // Revert on error by refetching cart
      try {
        const cart = await fetchCart();
        const m = new Map(cart.items.map((i) => [i.product.id, i.qty]));
        setCartMap(m);
      } catch (refetchError) {
        console.error("Failed to refetch cart:", refetchError);
      }
    }
  };

  // Handle product card click
  const handleProductClick = async (productId) => {
    try {
      const productDetails = await fetchProduct(productId);
      setSelectedProduct(productDetails);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      toast.error("Failed to load product details");
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => {
            const qty = cartMap.get(p.id) || 0;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-white shadow border border-slate-100 overflow-hidden cursor-pointer hover:shadow-lift transition-all duration-300"
                onClick={() => handleProductClick(p.id)}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-3">
                  <div className="text-sm text-slate-500">{p.piecesLabel}</div>
                  <div className="font-semibold mt-0.5">{p.title}</div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-bold">₹{p.price}</span>
                    <span className="text-slate-400 line-through text-sm">
                      ₹{p.mrp}
                    </span>
                    {p.discountPct > 0 && (
                      <span className="text-emerald-600 text-xs font-medium">
                        {p.discountPct}% off
                      </span>
                    )}
                  </div>

                  {/* Cart Controls */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      ETA {p.etaMinutes}m
                    </span>
                    {qty === 0 ? (
                      <button
                        onClick={() => updateQty(p.id, 1)}
                        className="px-3 py-1.5 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition-colors"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(p.id, qty - 1)}
                          className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="min-w-[2ch] text-center">{qty}</span>
                        <button
                          onClick={() => updateQty(p.id, qty + 1)}
                          className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
        cartQty={selectedProduct ? cartMap.get(selectedProduct.id) || 0 : 0}
        onUpdateQty={updateQty}
      />
    </>
  );
}
