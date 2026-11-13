const crypto = require("node:crypto");
const { promisify } = require("node:util");
const User = require("../models/User");
const { createAccessToken } = require("../middleware/auth");

const scrypt = promisify(crypto.scrypt);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const key = await scrypt(password, salt, 64);
  return { salt, hash: key.toString("hex") };
}

function publicUser(user) {
  return {
    id: String(user._id),
    email: user.email,
    name: user.displayName,
    avatar: user.avatarDataUrl || ""
  };
}

function sendSession(res, user, status = 200) {
  return res.status(status).json({ token: createAccessToken(user._id), user: publicUser(user) });
}

async function register(req, res, next) {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const name = String(req.body.name || "Cosmic Explorer").trim().slice(0, 24) || "Cosmic Explorer";
    if (!emailPattern.test(email) || email.length > 254) return res.status(400).json({ message: "Enter a valid email address." });
    if (password.length < 8 || password.length > 128) return res.status(400).json({ message: "Password must be between 8 and 128 characters." });
    createAccessToken("configuration-check");
    const credentials = await hashPassword(password);
    const user = await User.create({ email, displayName: name, passwordHash: credentials.hash, passwordSalt: credentials.salt });
    return sendSession(res, user, 201);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "An account with this email already exists. Sign in instead." });
    if (error.name === "ValidationError") return res.status(400).json({ message: "Check the account details and try again." });
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    if (!emailPattern.test(email) || !password || password.length > 128) return res.status(400).json({ message: "Enter your email and password." });
    const user = await User.findOne({ email }).select("+passwordHash +passwordSalt");
    if (!user) return res.status(401).json({ message: "Email or password is incorrect." });
    const { hash } = await hashPassword(password, user.passwordSalt);
    const storedHash = Buffer.from(user.passwordHash, "hex");
    const submittedHash = Buffer.from(hash, "hex");
    if (storedHash.length !== submittedHash.length || !crypto.timingSafeEqual(storedHash, submittedHash)) {
      return res.status(401).json({ message: "Email or password is incorrect." });
    }
    return sendSession(res, user);
  } catch (error) {
    next(error);
  }
}

function currentUser(req, res) {
  res.json({ user: publicUser(req.user) });
}

async function updateProfile(req, res, next) {
  try {
    if (req.body.name !== undefined) {
      const name = String(req.body.name).trim();
      if (!name || name.length > 24) return res.status(400).json({ message: "Explorer name must be between 1 and 24 characters." });
      req.user.displayName = name;
    }
    if (req.body.avatar !== undefined) {
      const avatar = String(req.body.avatar || "");
      if (avatar && (!/^data:image\/(png|jpeg|webp|gif);base64,/.test(avatar) || avatar.length > 180000)) {
        return res.status(400).json({ message: "Choose a supported image smaller than 130 KB." });
      }
      req.user.avatarDataUrl = avatar;
    }
    await req.user.save();
    res.json({ user: publicUser(req.user) });
  } catch (error) { next(error); }
}

module.exports = { register, login, currentUser, updateProfile };
