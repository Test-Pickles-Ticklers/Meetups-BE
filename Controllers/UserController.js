const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../Model/UserSchema");
const { express, dev_secret } = require("../config");
const user = express.Router();

user.use(express.json());

user
  .post("/signup", async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  })

  .post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email" });
      }
      const token = jwt.sign({ userId: user._id }, dev_secret, {
        expiresIn: "8h", // 8h for testing purposes
      });

      res.status(200).json({ success: true, token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = { user };
