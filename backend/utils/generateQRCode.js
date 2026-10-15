const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const generateQRCode = async (aadhar) => {
  try {
    const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
    const qrData = `${baseUrl}/trace/${aadhar}`; // URL to trace page

    // Save the QR code to 'D:/SIGMA WEB DEV/Food/Food/frontend/qr' directory
    // Use dynamic path relative to this file
    const qrCodePath = path.join(__dirname, '..', '..', 'frontend', 'qr', `${aadhar}.png`);

    // Ensure the directory exists
    const dir = path.dirname(qrCodePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Generate QR code and save it as an image
    await QRCode.toFile(qrCodePath, qrData);
    console.log("Generated a QRCode..!");

    // Return the relative URL to the QR code image (served from 'frontend/qr')
    return `/qr/${aadhar}.png`; // Adjusted to match server.js static serving

  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

module.exports = generateQRCode;
