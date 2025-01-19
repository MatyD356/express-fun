import jwt from "jsonwebtoken";
import UserSchema from "../model/User.js";

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ error: "Forbidden" });
  }
  const refreshToken = cookies.jwt;
  const user = await UserSchema.findOne({ refreshToken }).exec();
  const roles = Object.values(user.roles);
  console.log(user);
  if (!user) {
    return res.status(403).json({ error: "Forbidden" });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.username !== decoded.user.username) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const accessToken = jwt.sign(
      { user: { username: user.username, roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    res.json({ accessToken });
  });
};

export { handleRefresh };
