const { express, mongoose } = require("../config");
const { Meetups } = require("../Model/MeetupsSchema");
const { getMeetup, addParticipants } = require("../Services/MeetupServices");
const auth = require("../Utils/auth");

const meetup = express.Router();

meetup.use(express.json());

meetup
  .get("/meetups", async (req, res) => {
    try {
      const meetups = await Meetups.find({});
      return res.status(200).json(meetups);
    } catch (error) {
      return res.status(500).json({ msg: "Error retrieving meetups" });
    }
  })

  .put("/signup/:meetup", auth, async (req, res) => {
    //token
    try {
      const user = req.user;
      const meetup = req.params.meetup;
      const meetExists = await getMeetup(meetup);
      if (!meetExists) {
        return res.status(400).json({ msg: "Meetup doesn't exist" });
      }

      const addParticipant = await addParticipants(user, meetup);
      if (!addParticipant) {
        return res.status(400).json({ success: false });
      }

      return res.status(200).json({ success: true, msg: "brabrabrabrba" });
    } catch (error) {
      return res.status(500).json(error);
    }
  });
