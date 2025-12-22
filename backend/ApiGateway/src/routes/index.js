const express = require("express");
const axios = require("axios");
const routes = require("../config/routes.json");

const router = express.Router();

router.all("/:service", async (req, res) => {
  try {
    const service = req.params.service;

    if (!routes[service]) {
      return res.status(404).json({
        error: "Service not found",
        message: `Available services: ${Object.keys(routes).join(", ")}`,
      });
    }

    const targetUrl = `${routes[service].url}`;

    // Clean headers
    const headers = { ...req.headers };
    const token = headers.authorization || headers.Authorization;

    headers["Authorization"] = token;

    // Pass user context from API Gateway to services
    if (req.user) {
      headers["x-user-id"] = req.user.userId;
      headers["x-user-email"] = req.user.email;
      headers["x-user-role"] = req.user.role;
    }
    
    delete headers.host;
    delete headers.connection;
    delete headers["content-length"];

    console.log(`[${service}] Forwarding to: ${targetUrl}`);
    console.log(`[${service}] Body type:`, typeof req.body);

    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: headers,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error forwarding request:", error.message);
    console.error("Response data:", error.response?.data);

    res.status(error.response?.status || 500).json({
      error: "Service unavailable",
      message: error.response?.data || error.message,
    });
  }
});

module.exports = router;
