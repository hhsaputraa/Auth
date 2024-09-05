import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log("verifyToken: req.cookies.token", token);
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("verifyToken: decoded", decoded);
    if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

    req.userid = decoded.userid;
    console.log("verifyToken: req.userid", req.userid);
    next();
  } catch (error) {
    console.log("Error in verifyToken ", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
