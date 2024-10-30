const { express } = require("../config");
const { Meetups } = require("../Model/MeetupsSchema");
const {
  getMeetupById,
  addParticipants,
  addMeetup,
  cancelMeetupPartake,
} = require("../Services/MeetupServices");
const auth = require("../Utils/auth");

const meetup = express.Router();

meetup
  .get("/", async (req, res) => {
    try {
      const meetups = await Meetups.find();
      return res.status(200).send(meetups);
    } catch (error) {
      return res.status(500).send({ error: "Error retrieving meetups" });
    }
  })

  .get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const meetup = await getMeetupById(id);
      if (!meetup.success) {
        return res.status(400).send({ error: "Meetup doesn't exist" });
      }

      return res.status(200).send(meetup.data);
    } catch (error) {
      return res.status(500).send(error);
    }
  })

  .put("/:id/participate", auth, async (req, res) => {
    try {
      const user = req.user;
      const meetup = req.params.id;

      const meetExists = await getMeetupById(meetup);
      if (!meetExists.success) {
        return res.status(400).send({ error: "Meetup doesn't exist" });
      }

      const isValidlength = meetExists.data.participants.length;
      const isFull = isValidlength >= meetExists.data.maxParticipants;
      if (isFull) {
        return res.status(400).send({ error: "No slots left" });
      }

      const addParticipant = await addParticipants(user.email, meetup);
      if (!addParticipant.success) {
        return res.status(400).send({ error: addParticipant.msg });
      }

      return res.status(200).send(addParticipant.data);
    } catch (error) {
      return res.status(500).send(error);
    }
  })

  .put("/:id/cancel", auth, async (req, res) => {
    try {
      const user = req.user;
      const id = req.params.id;
      const meetup = await cancelMeetupPartake(id, user.email);
      if (!meetup.success) {
        return res.status(400).send({ error: meetup.msg });
      }
      return res.status(200).send(meetup.data);
    } catch (error) {
      return res.status(500).send(error);
    }
  })

  .post("/add", auth, async (req, res) => {
    try {
      const { title, organizer, date, time, location } = req.body;
      const meetup = await addMeetup(title, organizer, date, time, location);
      if (!meetup.success) {
        return res.status(400).send({ error: meetup.msg });
      }

      return res.status(200).send(meetup.data);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

module.exports = { meetup };
