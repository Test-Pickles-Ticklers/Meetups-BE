const {
  dev_port,
  mongoose,
  dev_uri,
  clientOptions,
  dev_url,
  express,
} = require("./config");
const { meetup } = require("./Controllers/MeetupController");
const { review } = require("./Controllers/ReviewController");
const { user } = require("./Controllers/UserController");
// const { auth } = require('./Utils/auth');

console.log(dev_port);
console.log(dev_url);
const server = express();

server.get("/", (req, res) => {
  res.sendStatus(200);
});

server.use("/api/user", user) 
server.use("/api/review", review)
server.use("/api/meetups", meetup)

let serverInstance;

const startServer = async () => {
  try {
    await mongoose.connect(dev_uri, clientOptions);
    console.log("Connected to MongoDb");


    serverInstance = server.listen(dev_port, () => {
      console.log(`Server running on https://${dev_url}:${dev_port}`);

    });
    console.log("serverInstance", serverInstance);
  } catch (error) {
    console.log("Failed to connect to MongoDb");
    console.error(error);
  }
};

const closeServer = () => {
  return new Promise((resolve) => {
    if (serverInstance) {
      serverInstance.close((err) => {
        if (err) {
          console.error("Error closing the server:", err);
        } else {
          console.log("Server closed successfully.");
        }
        resolve();
      });
    } else {
      console.log("Server is not running.");
      resolve();
    }
  });
};

module.exports = {
  server,
  startServer,
  closeServer,
};
