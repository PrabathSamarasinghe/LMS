const { authenticateCognito } =  require("../auth/cognitoAuth");

const publicRoutes = process.env.PUBLIC_ROUTES?.split(',') || [];

const authMiddleware = async (req, res, next) => {
  // Skip authentication for public routes
  if (publicRoutes.some(route => req.path.startsWith(`/${route}`))) {
    return next();
  }
  
  const authHeader = req.headers.authorization;  

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = await authenticateCognito(token);

    // Attach trusted user context
    req.user = {
      userId: payload.sub,
      email: payload.email,
      role: payload["custom:role"],
    };

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authMiddleware };