// Cart is tied to logged-in userId. Source of truth on server.
import { getDB } from "../db/mongo.js";
import { ObjectId } from "mongodb";

function rupeesFromPaise(n) {
  return Math.round((n || 0) / 100);
}

function toApiProduct(doc) {
  if (!doc) return null;
  const price = rupeesFromPaise(doc.pricePaise);
  const mrp = rupeesFromPaise(doc.mrpPaise);
  const discountPct =
    doc.discountPct ?? (mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0);
  return {
    id: doc._id.toString(),
    title: doc.title,
    image: doc.image,
    piecesLabel: doc.piecesLabel,
    price,
    mrp,
    discountPct,
    etaMinutes: doc.etaMinutes ?? 15,
    inCartQty: 0,
  };
}

async function ensureCart(db, userId) {
  const existing = await db
    .collection("cart")
    .findOne({ userId: new ObjectId(userId) });
  if (existing) return existing;
  const now = new Date();
  await db
    .collection("cart")
    .insertOne({ userId: new ObjectId(userId), items: [], updatedAt: now });
  return { userId: new ObjectId(userId), items: [], updatedAt: now };
}

export async function getCart(req, res) {
  try {
    const db = getDB();
    const userId = req.user.id;
    const cart = await ensureCart(db, userId);

    const ids = cart.items.map((it) => new ObjectId(it.productId));
    const prods = ids.length
      ? await db
          .collection("products")
          .find({ _id: { $in: ids } })
          .toArray()
      : [];
    const map = new Map(prods.map((p) => [p._id.toString(), p]));

    const items = cart.items
      .filter((it) => map.has(it.productId.toString()))
      .map((it) => ({
        product: toApiProduct(map.get(it.productId.toString())),
        qty: it.qty,
      }));

    const subtotal = items.reduce(
      (sum, it) => sum + it.product.price * it.qty,
      0
    );
    const totalItems = items.reduce((sum, it) => sum + it.qty, 0);

    return res.json({ items, subtotal, totalItems });
  } catch (error) {
    console.error("getCart error:", err);
    return res.status(500).json({ message: "Failed to fetch cart" });
  }
}

export async function setItemQty(req, res) {
  try {
    const db = getDB();
    const userId = req.user.id;
    const { productId, qty } =
      req.method === "PATCH"
        ? { productId: req.params.productId, qty: req.body?.qty }
        : req.body || {};

    if (!productId || typeof qty !== "number") {
      return res
        .status(400)
        .json({ message: "productId and qty are required" });
    }

    // Validate product exists
    const prod = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });
    if (!prod) return res.status(404).json({ message: "Product not found" });

    const now = new Date();
    const cart = await ensureCart(db, userId);

    let updatedItems;
    if (qty <= 0) {
      updatedItems = cart.items.filter(
        (it) => it.productId.toString() !== productId
      );
    } else {
      let found = false;
      updatedItems = cart.items.map((it) => {
        if (it.productId.toString() === productId) {
          found = true;
          return { ...it, qty };
        }
        return it;
      });
      if (!found)
        updatedItems.push({ productId: new ObjectId(productId), qty });
    }

    await db
      .collection("cart")
      .updateOne(
        { userId: new ObjectId(userId) },
        { $set: { items: updatedItems, updatedAt: now } }
      );

    return getCart(req, res);
  } catch (err) {
    console.error("setItemQty error:", err);
    return res.status(500).json({ message: "Failed to update cart" });
  }
}

export async function removeItem(req, res) {
  try {
    const db = getDB();
    const userId = req.user.id;
    const { productId } = req.params;

    await ensureCart(db, userId);
    await db.collection("cart").updateOne(
      { userId: new ObjectId(userId) },
      {
        $pull: { items: { productId: new ObjectId(productId) } },
        $set: { updatedAt: new Date() },
      }
    );

    return getCart(req, res);
  } catch (err) {
    console.error("removeItem error:", err);
    return res.status(500).json({ message: "Failed to remove item" });
  }
}

export async function clearCart(req, res) {
  try {
    const db = getDB();
    const userId = req.user.id;
    await ensureCart(db, userId);
    await db
      .collection("cart")
      .updateOne(
        { userId: new ObjectId(userId) },
        { $set: { items: [], updatedAt: new Date() } }
      );
    return res.json({ items: [], subtotal: 0, totalItems: 0 });
  } catch (err) {
    console.error("clearCart error:", err);
    return res.status(500).json({ message: "Failed to clear cart" });
  }
}
