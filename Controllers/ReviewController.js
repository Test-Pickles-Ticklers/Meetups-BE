const { Review } = require("../Model/ReviewSchema");
const { Meetups } = require("../Model/MeetupsSchema");
const { express } = require("../config");
const auth = require("../Utils/auth");
const review = express.Router();

// Post a review
review.post("/:meetupId", auth, async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const { meetupId } = req.params;

    const meetup = await Meetups.findById(meetupId);

    if (!meetup) {
      return res.status(404).send({ error: "Meetup not found" });
    }

    const newReview = new Review({
      meetupsId: meetup._id,
      reviewer: req.user.email,
      comment,
      rating,
    });

    await newReview.save();
    res.status(201).send(newReview);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send({ error: "An error occurred while saving the review" });
  }
});

//Get all reviews
review.get("/", auth, async (req, res) => {
  try {
    const reviews = await Review.find({});
    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(500).send({ msg: "Error retrieving meetups" });
  }
});

//Get one reviews
review.get("/:reviewId", auth, async (req, res) => {
  try {
    const reviews = await Review.findById({ _id: req.params.reviewId });
    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(500).send({ msg: "Error retrieving meetups" });
  }
});

module.exports = { review };
