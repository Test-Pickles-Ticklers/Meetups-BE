const { mongoose } = require("../config");

const meetupsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  participants: {
    type: [String],
    required: false,
  },
  maxParticipants: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  }
});

const Meetups = mongoose.model("Meetups", meetupsSchema);

module.exports = { Meetups };
