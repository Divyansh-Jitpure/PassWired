import jwt from "jsonwebtoken";

// Middleware to verify the access token from the Authorization header
const verifyAccessToken = (req, res, next) => {
  // Get the Authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];

  // Verify the token using the secret key 
  jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    // Attach the decoded user information to the request object
    req.user = user;
    next();
  });
};

export default verifyAccessToken;
