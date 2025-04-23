import express from 'express';
import qr from 'qr-image';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// QR code generation endpoint
app.get('/qr', (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('URL is required');

  try {
    const qr_svg = qr.image(url, { type: 'png' });
    res.type('png');
    qr_svg.pipe(res);
  } catch (err) {
    res.status(500).send('Error generating QR code');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});