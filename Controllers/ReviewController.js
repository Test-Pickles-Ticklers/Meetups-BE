const { Review } = require('../Model/ReviewSchema');
const { Meetups } = require('../Model/MeetupsSchema');
const { express } = require('../config');
const auth = require('../Utils/auth');
const review = express.Router();

review.use(express.json());

review.post('/:meetupId', auth, async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const { meetupId } = req.params;

    const meetup = await Meetups.findById(meetupId);

    if (!meetup) {
      return res.status(404).json({ error: 'Meetup not found' });
    }

    const newReview = new Review({
      meetupsId: meetup._id,
      reviewer: req.user.email,
      comment,
      rating,
    });

    await newReview.save();
    res.status(201).json({ review: newReview });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: 'An error occurred while saving the review' });
  }
});

module.exports = { review };
