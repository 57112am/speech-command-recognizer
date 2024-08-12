import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

/**
 * Middleware to protect routes by verifying the JWT token.
 * @function protectRoute
 * @param {express.Request} req - The request object, which contains the cookies and other request data.
 * @param {express.Response} res - The response object, used to send responses to the client.
 * @param {express.NextFunction} next - The next middleware function to call if authentication is successful.
 * @returns {void}
 * @throws {401} Unauthorized - No token provided or invalid token.
 * @throws {404} Not Found - User not found.
 * @throws {500} Internal Server Error - On unexpected errors.
 *
 * @description
 * This middleware function:
 * 1. Extracts the JWT token from the cookies.
 * 2. Verifies the token using the JWT_SECRET environment variable.
 * 3. If the token is valid, it retrieves the user from the database based on the token's payload.
 * 4. If the user exists, it attaches the user object to the request (`req.user`).
 * 5. If any step fails, it sends an appropriate error response.
 */
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // console.log("token ****",token);
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
