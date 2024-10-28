const { dev_port, mongoose, dev_uri, clientOptions, dev_url, express } = require("./config");
const { meetups } = require("./Controllers/MeetupController");
const { review } = require("./Controllers/ReviewController");
const { user } = require("./Controllers/UserController");
// const { auth } = require('./Utils/auth');

console.log(dev_port)
console.log(dev_url)
const server = express();

server.use("/api/user", user) 
server.use("/api/review", review)
// server.use("/api/meetups", meetups)

const startServer = async () => {
  try {
    await mongoose.connect(dev_uri, clientOptions)
    console.log("Connected to MongoDb");

    server.listen(dev_port, () => {
        console.log(`Server running on http://${dev_url}:${dev_port}`)
    });
  } catch (error) {
    console.log("Failed to connect to MongoDb")
    console.error(error);
  }
};

startServer();