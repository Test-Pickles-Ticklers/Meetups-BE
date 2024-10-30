const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../Model/UserSchema");
const { express, dev_secret } = require("../config");
const user = express.Router();
const auth = require("../Utils/auth");
const { getParticipation } = require("../Services/UsersService");

user.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

user.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).send({ error: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ error: "Invalid password" });

    const token = jwt.sign({ userEmail: user.email }, dev_secret, {
      expiresIn: "8h",
    });

    res.status(200).send({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

user.get("/meetups", auth, async (req, res) => {
  const { email } = req.user;
  try {
    const data = await getParticipation(email);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = { user };
