const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp"); // Back to Sharp!

const app = express();
const PORT = 3000;

// Multer catches the file upload and holds it in memory
const upload = multer({ storage: multer.memoryStorage() });

// The root destination folder
const baseDir = path.join(__dirname, "images");

// Serve the HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// The endpoint you submit to
app.post("/upload", upload.single("file"), async (req, res) => {
  const relativePath = req.body.relativePath;

  if (!relativePath || !req.file) {
    return res.status(400).send("Missing file data");
  }

  // Change the extension from .png to .webp
  const webpRelativePath = relativePath.replace(/\.png$/i, ".webp");
  const fullOutputPath = path.join(baseDir, webpRelativePath);
  const dir = path.dirname(fullOutputPath);

  // Recreate the industry subfolder if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    // Sharp takes the raw uploaded file, converts to WebP, removes metadata, and saves it
    await sharp(req.file.buffer).webp({ quality: 80 }).toFile(fullOutputPath);

    res.send("Converted and saved");
  } catch (error) {
    console.error(`Error processing ${relativePath}:`, error);
    res.status(500).send("Conversion failed");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running! Visit http://localhost:${PORT}`);
});
