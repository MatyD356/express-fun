import bcrypt from "bcrypt";
import UserModel from "../model/User.js";

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Please provide username and password" });
  }

  const duplicateUser = await UserModel.findOne({ username: username }).exec();

  if (duplicateUser) {
    return res.status(409).json({ error: "Username already exists" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await UserModel.create({
      username: username,
      password: hashedPassword,
    });

    console.log(result);

    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "User could not be created" });
  }
};

export { handleNewUser };
