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

4. With `generate-qr.js` you can generate a QR code from your site URL.

   1. Add `SITE_URL=""` to `.env` and set your URL, for example:

      ```text
      SITE_URL="https://example.com"
      ```

   2. Run:

      ```bash
      node generate-qr.js
      ```

   3. It will output a QR code (typically saved to a file or printed in terminal depending on script behavior).

5. If you want to delete existing PNG files from the current folder tree:

   ```bash
   find ./images -name "*.png" -type f -delete
   ```
