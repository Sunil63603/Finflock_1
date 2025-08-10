//Global cart store via React Context(lightweight, no external state lib).
//Features:addItem, removeItem , getQty, subtotal, totalItems

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  //items:Map of id->{product,qty}.
  const [items, setItems] = useState(new Map());

  const addItem = useCallback((product) => {
    setItems((prev) => {
      const next = new Map(prev);
      const curr = next.get(product.id);
      const qty = (curr?.qty || 0) + 1;
      next.set(product.id, { product, qty });
      return next;
    });
  }, []);

  const removeItem = useCallback((product) => {
    setItems((prev) => {
      const next = new Map(prev);
      const curr = next.get(product.id);
      if (!curr) return prev;
      const qty = curr.qty - 1;
      if (qty <= 0) next.delete(product.id);
      else next.set(product.id, { product, qty });
      return next;
    });
  }, []);

  const getQty = useCallback((id) => items.get(id)?.qty || 0, [items]);

  const { totalItems, subtotal } = useMemo(() => {
    let count = 0,
      sum = 0;
    items.forEach(({ product, qty }) => {
      count += qty;
      sum += (product?.price || 0) * qty;
    });
    return { totalItems: count, subtotal: sum };
  }, [items]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, getQty, totalItems, subtotal }),
    [items, addItem, removeItem, getQty, totalItems, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error(`useCart must be used within <CartProvider>`);
  return ctx;
}
