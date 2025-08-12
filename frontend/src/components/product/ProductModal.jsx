import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const formatMoney = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

export default function ProductModal({
  product,
  isOpen,
  onClose,
  cartQty = 0,
  onUpdateQty,
}) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
              <motion.div
                className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
                layout
              >
                {/* Header with Close Button */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <h2 className="text-xl font-semibold text-slate-800">
                    Product Details
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                  >
                    <X size={20} className="text-slate-600" />
                  </motion.button>
                </div>

                {/* Product Content */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                  {/* Product Image */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative"
                  >
                    <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                  </motion.div>

                  {/* Product Title & Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3"
                  >
                    <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                      {product.title}
                    </h1>
                    <Badge className="rounded-full px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/20 text-primary border border-primary/20">
                      {product.piecesLabel}
                    </Badge>
                  </motion.div>

                  {/* Pricing */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-slate-900">
                        {formatMoney(product.price)}
                      </span>
                      {product.mrp > product.price && (
                        <span className="text-xl text-slate-400 line-through">
                          {formatMoney(product.mrp)}
                        </span>
                      )}
                    </div>
                    {product.discountPct > 0 && (
                      <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                        {product.discountPct}% OFF
                      </span>
                    )}
                  </motion.div>

                  <Separator />

                  {/* Product Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-slate-800">
                      Product Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <ShoppingCart size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">
                              Delivery Time
                            </p>
                            <p className="font-medium text-slate-800">
                              {product.etaMinutes} minutes
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-accent"></div>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">
                              Availability
                            </p>
                            <p className="font-medium text-slate-800 text-green-600">
                              In Stock
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <div className="w-4 h-4 rounded bg-primary"></div>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Category</p>
                            <p className="font-medium text-slate-800">
                              {product.category || "Grocery"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-accent"></div>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Product ID</p>
                            <p className="font-medium text-slate-800 font-mono text-sm">
                              {product.id}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <Separator />

                  {/* Cart Controls */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-slate-800">
                      Add to Cart
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {cartQty === 0 ? (
                          <Button
                            onClick={() => onUpdateQty(product.id, 1)}
                            className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary via-primary-500 to-primary-600 text-white font-semibold shadow-glow hover:shadow-glow-accent transition-all duration-300"
                          >
                            <ShoppingCart size={20} className="mr-2" />
                            Add to Cart
                          </Button>
                        ) : (
                          <div className="flex items-center gap-3">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() =>
                                  onUpdateQty(product.id, cartQty - 1)
                                }
                                className="h-10 w-10 rounded-full border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                              >
                                <Minus size={16} className="text-primary" />
                              </Button>
                            </motion.div>

                            <motion.div
                              className="min-w-16 text-center text-xl font-bold text-primary bg-primary/5 rounded-xl px-4 py-2"
                              key={cartQty}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              }}
                            >
                              {cartQty}
                            </motion.div>

                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                size="icon"
                                onClick={() =>
                                  onUpdateQty(product.id, cartQty + 1)
                                }
                                className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-primary-600 text-white shadow-glow hover:shadow-glow-accent transition-all duration-200"
                              >
                                <Plus size={16} />
                              </Button>
                            </motion.div>
                          </div>
                        )}
                      </div>

                      {cartQty > 0 && (
                        <div className="text-right">
                          <p className="text-sm text-slate-500">Total Price</p>
                          <p className="text-xl font-bold text-slate-900">
                            {formatMoney(product.price * cartQty)}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
