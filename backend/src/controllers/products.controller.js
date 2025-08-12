// GET /api/products  | GET /api/products/:id
// Data shape matches ProductCard & CartItem.
import { getDB } from "../db/mongo.js";
import { ObjectId } from "mongodb";

// map DB doc -> API product (convert paise -> rupees; compute discount if missing)
function toApiProduct(doc) {
  if (!doc) return null;
  const price = Math.round((doc.pricePaise || 0) / 100);
  const mrp = Math.round((doc.mrpPaise || 0) / 100);
  const discountPct =
    doc.discountPct ?? (mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0);
  return {
    id: (doc._id || doc.id)?.toString(),
    title: doc.title,
    image: doc.image, // keep same field name used in JSX
    piecesLabel: doc.piecesLabel,
    price, // rupees for UI
    mrp, // rupees for UI
    discountPct,
    etaMinutes: doc.etaMinutes ?? 15,
    inCartQty: 0, // UI may override via cart
  };
}

export async function listProducts(req, res) {
  try {
    const db = getDB();
    const { q, category, limit = 24 } = req.query;

    const filter = { isActive: { $ne: false } };
    if (category) filter.category = category;
    if (q) {
      // prefer text index if present; fallback to regex
      filter.$or = [
        { $text: { $search: q } },
        { title: { $regex: q, $options: "i" } },
      ];
    }

    const docs = await db
      .collection("products")
      .find(filter)
      .limit(Number(limit))
      .toArray();

    return res.json(docs.map(toApiProduct));
  } catch (error) {
    console.error("listProducts error:", error);
    return res.status(500).json({ message: "Failed to fetch products" });
  }
}

export async function getProductById(req, res) {
  try {
    const db = getDB();
    const { id } = req.params;
    const doc = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    if (!doc) return res.status(404).json({ message: "Product not found" });
    return res.json(toApiProduct(doc));
  } catch (error) {
    console.error("getProductById error:", err);
    return res.status(400).json({ message: "Invalid product id" });
  }
}
