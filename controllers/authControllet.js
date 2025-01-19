import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userSchema from "../model/User.js";

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Please provide username and password" });
  }
  const user = await userSchema.findOne({ username }).exec();
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  try {
    const match = await bcrypt.compare(password, user.password);
    const roles = Object.values(user.roles);
    if (match) {
      //create JWTS
      const accessToken = jwt.sign(
        { user: { username: user.username, roles } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60s" }
      );
      const refreshToken = jwt.sign(
        { user: { username: user.username } },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      user.refreshToken = refreshToken;
      await user.save();

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 25 * 60 * 60 * 1000,
        sameSite: "None",
        secure: true,
      });
      return res.json({ accessToken });
    }
    res.status(401).json({ error: "Invalid password" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};

export { handleLogin };
