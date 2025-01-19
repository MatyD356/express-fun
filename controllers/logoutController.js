import UserSchema from "../model/User.js";
const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204);
  }
  const refreshToken = cookies.jwt;
  const user = await UserSchema.findOne({ refreshToken }).exec();
  if (!user) {
    res.clearCookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 25 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });
    return res.status(204).json({ error: "Forbidden" });
  }
  user.refreshToken = "";
  await user.save();

  res.clearCookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 25 * 60 * 60 * 1000,
    sameSite: "None",
    secure: true,
  });
  res.status(204).json({ message: "Logged out" });
};

export { handleLogout };
