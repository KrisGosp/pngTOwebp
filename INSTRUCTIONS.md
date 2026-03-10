# PNG to WebP Converter - Quick Start

1. Run project dependencies install:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   node server.js
   ```

3. Add PNG images to the drop folder using this format:

   `images/[image_folder]/[image.png]`

4. If you want to delete existing PNG files from the current folder tree:

   ```bash
   find ./images -name "*.png" -type f -delete
   ```
