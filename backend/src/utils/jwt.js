// src/utils/jwt.js
import crypto from "crypto";

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function signJWT(payload, secret) {
  const header = { alg: "HS256", typ: "JWT" };
  const encHeader = base64url(JSON.stringify(header));
  const encPayload = base64url(JSON.stringify(payload));
  const data = `${encHeader}.${encPayload}`;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return `${data}.${signature}`;
}

export function verifyJWT(token, secret) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [encHeader, encPayload, signature] = parts;
  const data = `${encHeader}.${encPayload}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  if (signature !== expected) return null;
  try {
    const json = JSON.parse(Buffer.from(encPayload, "base64").toString("utf8"));
    return json; // no exp field by design
  } catch {
    return null;
  }
}
