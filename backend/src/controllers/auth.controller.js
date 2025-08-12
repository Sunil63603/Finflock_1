// POST /api/auth/login
// Accepts email and password from UI, validates against existing users collection
import { getDB } from "../db/mongo.js";
import { signJWT } from "../utils/jwt.js";
import bcrypt from "bcrypt";

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const db = getDB();

    // Find user by email
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "User not found" });
    }

    // Generate JWT token
    const token = signJWT(
      { userId: user._id.toString(), email: user.email, name: user.name },
      process.env.JWT_SECRET || ""
    );

    return res.json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        address: user.address || {},
      },
    });
  } catch (error) {
    console.error("login error:", error);
    return res.status(500).json({ message: "Login failed" });
  }
}
