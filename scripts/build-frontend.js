const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const frontendDirectory = path.join(projectRoot, "frontend");
const outputDirectory = path.join(projectRoot, "dist");
const isVercelBuild = process.argv.includes("--production") || process.env.VERCEL === "1";
const configuredApiUrl = process.env.COSMIC_API_URL || "http://localhost:5000/api";

if (isVercelBuild && !process.env.COSMIC_API_URL) {
  throw new Error("Set COSMIC_API_URL in Vercel before building the frontend.");
}

let apiUrl;
try {
  apiUrl = new URL(configuredApiUrl);
} catch {
  throw new Error("COSMIC_API_URL must be an absolute URL ending in /api.");
}

if (apiUrl.pathname.replace(/\/+$/, "") !== "/api") {
  throw new Error("COSMIC_API_URL must end in /api.");
}

const isLocalHttp = apiUrl.protocol === "http:" && ["localhost", "127.0.0.1"].includes(apiUrl.hostname);
if (apiUrl.protocol !== "https:" && (isVercelBuild || !isLocalHttp)) {
  throw new Error("COSMIC_API_URL must use HTTPS for deployment; HTTP is allowed only for localhost development.");
}

const normalizedApiUrl = apiUrl.toString().replace(/\/$/, "");
fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.cpSync(frontendDirectory, outputDirectory, { recursive: true });
fs.writeFileSync(
  path.join(outputDirectory, "runtime-config.js"),
  `window.COSMIC_API_URL = ${JSON.stringify(normalizedApiUrl)};\n`,
  "utf8"
);

console.log("Static frontend built successfully.");
