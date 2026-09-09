import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import createOrderHandler from './api/create-order.js';
import verifyPaymentHandler from './api/verify-payment.js';
import adminEbooksHandler from './api/admin-ebooks.js';
import adminUploadHandler from './api/admin-upload.js';

dotenv.config();

const app = express();
const port = 5174;

app.use(cors());
app.use(express.json()); // Parses application/json bodies

// Map Vercel serverless endpoints to Express routes
app.post('/api/create-order', (req, res) => {
  createOrderHandler(req, res);
});

app.post('/api/verify-payment', (req, res) => {
  verifyPaymentHandler(req, res);
});

app.all('/api/admin-ebooks', (req, res) => {
  adminEbooksHandler(req, res);
});

app.all('/api/admin-upload', (req, res) => {
  adminUploadHandler(req, res);
});

app.listen(port, () => {
  console.log(`Local API Mock Server running at http://localhost:${port}`);
});
