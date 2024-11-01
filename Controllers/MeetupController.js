const {
  getMeetupById,
  addParticipants,
  addMeetup,
  cancelMeetupPartake,
  deleteMeetup,
  updateMeetupById,
  getMeetupList,
} = require('../Services/MeetupServices');
const auth = require('../Middlewares/auth');
const { express } = require('../config');

const meetup = express.Router();

meetup
  .get('/', async (req, res) => {
    try {
      const meetups = await getMeetupList();
      return res.status(200).send(meetups);
    } catch (error) {
      return res.status(500).send({ error: 'Error retrieving meetups' });
    }
  })
  .post('/', auth, async (req, res) => {
    try {
      const { email } = req.user;
      const {
        title,
        date,
        time,
        location,
        maxParticipants,
        category,
        description,
      } = req.body;

      const newMeetup = {
        title,
        organizer: email,
        date,
        time,
        location,
        maxParticipants,
        category,
        description,
      };

      const meetup = await addMeetup(newMeetup);
      if (!meetup.success) {
        return res.status(400).send({ error: meetup.msg });
      }

      return res.status(200).send(meetup.data);
    } catch (error) {
      return res.status(500).send(error);
    }
  })

  .get('/:id', async (req, res) => {
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

  .delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const meetup = await deleteMeetup(id);
      if (!meetup) {
        return res.status(400).send({ error: "Meetup doesn't exist" });
      }

      return res.status(200).send(true);
    } catch (error) {
      return res.status(500).send(error);
    }
  })

  .put('/:id', auth, async (req, res) => {
    try {
      const id = req.params.id;
      const updatedMeetupData = req.body;

      const result = await updateMeetupById(id, updatedMeetupData);

      if (!result.success) {
        return res
          .status(404)
          .send({ error: result.msg || 'Meetup not found' });
      }

      return res.status(200).send(result.data);
    } catch (error) {
      return res.status(500).send(error);
    }
  })

  .put('/:id/participate', auth, async (req, res) => {
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
        return res.status(400).send({ error: 'No slots left' });
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

  .put('/:id/cancel', auth, async (req, res) => {
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
  });

module.exports = { meetup };
