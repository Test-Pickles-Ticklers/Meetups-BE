const { get } = require("mongoose");
const { express, mongoose } = require("../config");
const { Meetups } = require("../Model/MeetupsSchema");
const { getMeetup, getMeetupById, addParticipants, addMeetup } = require("../Services/MeetupServices");
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

  .get("/meetup/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const meetup = await getMeetupById(id);
        if(!meetup.success){
            return res.status(400).json({ success: meetup.success, msg: "Meetup doesn't exist"})
        }

        return res.status(200).json({ success: meetup.success, data: meetup.data });
    } catch (error) {
        return res.status(500).json(error);
    }
  })

  .put("/signup/:id", auth, async (req, res) => {
    //token
    try {
      const user = req.user;
      const meetup = req.params.id;

      const meetExists = await getMeetupById(meetup);
      if (!meetExists.success) {
        return res.status(400).json({ msg: "Meetup doesn't exist" });
      }

      const isValidlength = meetExists.data.participants.length;
      if(isValidlength >=5) {
        return res.status(400).json({success: false, msg: "No slots left"});
      }

      const addParticipant = await addParticipants(user.userEmail, meetup);
      if (!addParticipant.success) {
        return res.status(400).json({ success: addParticipant.success, msg: addParticipant.msg });
      }

      return res.status(200).json({ success: addParticipant.success, data: addParticipant.data });
    } catch (error) {
      return res.status(500).json(error);
    }
  })

  .post("/add", auth, async (req, res) => {
    try {
        const {title, organizer, date, time, location} = req.body;
        const meetup = await addMeetup(title, organizer, date, time, location);
        if (!meetup.success) {
            return res.status(400).json({ success: meetup.success, msg: meetup.msg });
        }

        return res.status(200).json({success: meetup.success, data: meetup.data });
    } catch (error) {
        return res.status(500).json(error)
    }
  })


module.exports = { meetup }