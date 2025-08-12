const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

function getToken() {
  return localStorage.getItem("token") || "";
}

export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) headers["Authorization"] = `Bearer ${getToken()}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json();
}

// Auth
export async function loginUser(email, password) {
  return api("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

// Auth
export async function loginDemo() {
  return api("/api/auth/login", { method: "POST" });
}

// Products
export async function fetchProducts(q) {
  const qs = q ? `?q=${encodeURIComponent(q)}` : "";
  return api(`/api/products${qs}`);
}

export async function fetchProduct(id) {
  return api(`/api/products/${id}`);
}

// Cart
export async function fetchCart() {
  return api("/api/cart", { auth: true });
}
export async function setCartQty(productId, qty) {
  // Server accepts POST /items with { productId, qty } or PATCH /items/:productId
  return api("/api/cart/items", {
    method: "POST",
    auth: true,
    body: { productId, qty },
  });
}
export async function removeCartItem(productId) {
  return api(`/api/cart/items/${productId}`, { method: "DELETE", auth: true });
}
export async function clearCart() {
  return api("/api/cart", { method: "DELETE", auth: true });
}
