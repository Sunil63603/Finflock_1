//Purpose:Tiny helpers for currency formatting & savings calc

export const money = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
export const savings = (mrp, price) =>
  Math.max(0, (Number(mrp) || 0) - (Number(price) || 0));
