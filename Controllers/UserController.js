const { express } = require("../config");
const user = express.Router();
const auth = require("../Middlewares/auth");
const { getAllReviewsByUser } = require("../Services/ReviewService");
const {
  getParticipation,
  loginUser,
  registerUser,
} = require("../Services/UsersService");

user.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

user.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);

    res.status(200).send({ token, email });
  } catch (error) {
    res.status(error.status).send({ error: error.message });
  }
});

user.get("/meetups", auth, async (req, res) => {
  try {
    const { email } = req.user;
    const data = await getParticipation(email);

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

user.get("/reviews", auth, async (req, res) => {
  try {
    const { email } = req.user;
    const data = await getAllReviewsByUser(email);

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = { user };
