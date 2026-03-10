const QRCode = require("qrcode");

const websiteUrl = process.env.SITE_URL; // Your exact URL
const outputPath = "./permanent-qr.png";

QRCode.toFile(
  outputPath,
  websiteUrl,
  {
    color: {
      dark: "#8474f9", // The dots (can be any hex color)
      light: "#0000", // The background (can be transparent: '#0000')
    },
    width: 500, // High res for printing
    margin: 2,
    errorCorrectionLevel: "H", // THIS IS THE SECRET SAUCE FOR DESIGN
  },
  function (err) {
    if (err) throw err;
    console.log(`✅ Boom. Permanent QR code saved to ${outputPath}`);
  },
);
