import "dotenv/config";
import { ObjectId } from "mongodb";
import { connectToDB, closeDB, getDB } from "../src/db/mongo.js";

async function main() {
  await connectToDB();
  const db = getDB();
  const now = new Date();

  // 1) demo user (for login-without-credentials)
  const email = process.env.DEMO_EMAIL || "demo@finflock.app";
  const name = process.env.DEMO_NAME || "Finflock Demo";

  let user = await db.collection("users").findOne({ email });

  if (!user) {
    const insert = {
      name,
      email,
      passwordHash: "",
      address: { line1: "", line2: "", city: "", state: "", pincode: "" },
    };

    const { insertedId } = await db.collection("users").insertOne(insert);
    user = { _id: insertedId, ...insert };
    console.log(`✔ created demo user: ${email}`);
  } else {
    console.log(`✔ demo user exists: ${email}`);
  }

  // 2) products — match Listing.jsx mock EXACTLY
  // titles (12)
  const titles = [
    "Bananas - Yelakki",
    "Amul Toned Milk",
    "Tomatoes - Hybrid",
    "Potato Pack",
    "Apple - Royal Gala",
    "Bread - Whole Wheat",
    "Coke 750ml",
    "Basmati Rice 1kg",
    "Onion 1kg",
    "Parle-G Family Pack",
    "Yogurt Cup 400g",
    "Mango - Alphonso",
  ];

  const piecesList = ["6 pcs", "500 g", "1 kg", "1 L"];
  const mrps = [50, 65, 110, 199];
  const prices = [39, 52, 89, 149];

  // Keep it simple: reset products for deterministic seeds
  await db.collection("products").deleteMany({});

  const docs = Array.from({ length: 12 }).map((_, i) => {
    const mrp = mrps[i % 4];
    const price = prices[i % 4];
    return {
      title: titles[i % 12],
      image: `https://picsum.photos/seed/product-${i}/400/400`,
      piecesLabel: piecesList[i % 4],
      pricePaise: price * 100,
      mrpPaise: mrp * 100,
      etaMinutes: 15,
      isActive: true,
    };
  });

  const { insertedIds } = await db.collection("products").insertMany(docs);
  console.log(`✔ inserted ${Object.keys(insertedIds).length} products`);

  // 3) ensure empty cart for demo user
  await db
    .collection("cart")
    .updateOne(
      { userId: user._id },
      { $setOnInsert: { items: [], updatedAt: now } },
      { upsert: true }
    );
  console.log("✔ ensured empty cart for demo user");
}

main()
  .then(() => closeDB())
  .catch((e) => {
    console.error(e);
    return closeDB();
  });
