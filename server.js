const cors = require('cors');
const auth = require('./Middlewares/auth');
const {
  dev_port,
  mongoose,
  dev_uri,
  clientOptions,
  dev_url,
  express,
  origin_url,
} = require('./config');
require('dotenv').config();

const { meetup } = require('./Controllers/MeetupController');
const { review } = require('./Controllers/ReviewController');
const { user } = require('./Controllers/UserController');

const server = express();

const corsOptions = {
  origin: origin_url,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

server.use(cors(corsOptions));
server.use(express.json());

server.get('/', (req, res) => {
  res.sendStatus(200);
});

server.use('/api/user', user);
server.use('/api/review', auth, review);
server.use('/api/meetups', meetup);

let serverInstance;

const startServer = async () => {
  try {
    await mongoose.connect(dev_uri, clientOptions);
    console.log('Connected to MongoDb');

    serverInstance = server.listen(dev_port, () => {
      console.log(`Server running on https://${dev_url}:${dev_port}`);
    });
  } catch (error) {
    console.log('Failed to connect to MongoDb');
    console.error(error);
  }
};

const closeServer = () => {
  return new Promise((resolve) => {
    if (serverInstance) {
      serverInstance.close((err) => {
        if (err) {
          console.error('Error closing the server:', err);
        } else {
          console.log('Server closed successfully.');
        }
        resolve();
      });
    } else {
      console.log('Server is not running.');
      resolve();
    }
  });
};

module.exports = {
  server,
  startServer,
  closeServer,
};
