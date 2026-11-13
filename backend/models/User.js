const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
  displayName: { type: String, required: true, trim: true, maxlength: 24, default: "Cosmic Explorer" },
  passwordHash: { type: String, required: true, select: false },
  passwordSalt: { type: String, required: true, select: false },
  avatarDataUrl: { type: String, default: "", maxlength: 180000 },
  quizAttempts: { type: [mongoose.Schema.Types.Mixed], default: [] },
  missionHistory: { type: [mongoose.Schema.Types.Mixed], default: [] }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
