import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try {
    // Create a token with the given userId and secret key
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token expires in 7 days
    });

    // Set the token as a cookie in the response
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true, // Restrict access to the cookie to the server
      sameSite: "strict", // Allow the cookie only for same-origin requests
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Could not generate token");
  }
};
