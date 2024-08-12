import jwt from "jsonwebtoken";

/**
 * Generates a JWT token for the user and sets it as an HTTP-only cookie.
 * @param {string} userId - The ID of the user to include in the token payload.
 * @param {Response} res - The Express response object to set the cookie on.
 */
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  // console.log(token);
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
