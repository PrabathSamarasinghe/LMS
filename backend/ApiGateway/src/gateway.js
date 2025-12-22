const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { authMiddleware } = require('./middleware/auth.middleware');
require('dotenv').config();

const port = process.env.PORT || 4000;

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.send({ status: 'API Gateway is running' });
});

app.use("/", authMiddleware, routes);

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});