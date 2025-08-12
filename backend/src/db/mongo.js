// src/db/mongo.js
import { MongoClient } from "mongodb";

let client; // singleton MongoClient
let db; // cached DB instance

export async function connectToDB() {
  if (db) return db; // already connected

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || "finflock";

  if (!uri) throw new Error("MONGODB_URI missing in .env");

  client = new MongoClient(uri, {
    // tune timeouts/retries as you like
    maxPoolSize: 10,
  });

  await client.connect();
  db = client.db(dbName);

  // basic indexes (safe to call repeatedly)
  await Promise.all([
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
    db
      .collection("products")
      .createIndex({ title: "text", category: 1, brand: 1 }),
    db.collection("cart").createIndex({ userId: 1 }, { unique: true }),
  ]);

  return db;
}

export function getDB() {
  if (!db) throw new Error("DB not initialized. Call connectToDB() first.");
  return db;
}

export async function closeDB() {
  if (client) await client.close();
  client = undefined;
  db = undefined;
}
