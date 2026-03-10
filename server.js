const express = require("express");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const app = express();
const PORT = 3000;

// This points to your existing images folder containing the 18 industry subfolders
const baseDir = path.join(__dirname, "images");

// This route catches requests exactly like an edge server
app.get("/images/:industry/:filename", async (req, res) => {
  const { industry, filename } = req.params;

  // Look for the original file on the hard drive
  const originalPath = path.join(baseDir, industry, filename);

  // If the file doesn't exist, return a 404
  if (!fs.existsSync(originalPath)) {
    return res.status(404).send("Image not found");
  }

  try {
    // 1. Read the original file
    // 2. Automatically strip metadata (Sharp does this by default)
    // 3. Convert to WebP on the fly
    const webpBuffer = await sharp(originalPath)
      .webp({ quality: 80 })
      .toBuffer();

    // 4. Force the browser to recognize it as a WebP, even if the URL says .png
    res.set("Content-Type", "image/webp");

    // 5. Add caching headers so the browser remembers it, just like Cloudflare
    res.set("Cache-Control", "public, max-age=31536000");

    // 6. Send the optimized image to the user
    res.send(webpBuffer);

    console.log(`Served on-the-fly WebP for: ${industry}/${filename}`);
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
    res.status(500).send("Error processing image");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Local Edge Server running on http://localhost:${PORT}`);
  console.log(`Test it out by opening a browser to an image URL!`);
});
