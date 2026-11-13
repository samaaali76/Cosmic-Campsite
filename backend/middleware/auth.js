const crypto = require("node:crypto");

function getSecret() {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret || secret.length < 32) {
    const error = new Error("Account authentication is not configured. Set ACCESS_TOKEN_SECRET to at least 32 characters.");
    error.status = 503;
    throw error;
  }
  return secret;
}

function signPayload(payload) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", getSecret()).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

function verifyToken(token) {
  const [encoded, signature] = String(token || "").split(".");
  if (!encoded || !signature) return null;
  const expected = crypto.createHmac("sha256", getSecret()).update(encoded).digest();
  let actual;
  try { actual = Buffer.from(signature, "base64url"); } catch { return null; }
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    return payload.exp > Date.now() ? payload : null;
  } catch { return null; }
}

function createAccessToken(userId) {
  const now = Date.now();
  return signPayload({ sub: String(userId), iat: now, exp: now + 7 * 24 * 60 * 60 * 1000 });
}

async function requireAuth(req, res, next) {
  const token = req.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return res.status(401).json({ message: "Sign in to access your explorer account." });
  try {
    const payload = verifyToken(token);
    if (!payload) return res.status(401).json({ message: "Your session expired. Please sign in again." });
    const User = require("../models/User");
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: "This explorer account was not found." });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { createAccessToken, requireAuth };
