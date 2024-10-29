const { Review } = require('../Model/ReviewSchema');
// const { Meetup } = require('../Model/MeetupSchema');
const { express } = require('../config');
const auth = require('../Utils/auth');
const review = express.Router();

review.use(express.json());

review.post('/',auth, async (req, res) => {
  try {
    const { comment, rating, meetupId } = req.body;

    const meetup = await Meetup.findById(meetupId);

    if (!meetup) {
      return res.status(404).json({ error: 'Meetup not found' });
    }
    
    const newReview = new Review({
      meetup: meetup._id,
      reviewer: req.user.email,
      comment,
      rating,
    });

    await newReview.save();
    res.status(201).send(newReview);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = {review};