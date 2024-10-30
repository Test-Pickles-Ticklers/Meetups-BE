const { express } = require("../config");
const review = express.Router();
const {
  postReview,
  getReview,
  getReviewList,
} = require("../Services/ReviewService");

// Post a review
review.post("/:meetupsId", async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const { meetupsId } = req.params;
    const { email } = req.user;

    const review = { comment, rating, email, meetupsId };

    const newReview = await postReview(review);

    res.status(201).send(newReview);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send({ error: "An error occurred while saving the review" });
  }
});

//Get all reviews
review.get("/:meetupsId", async (req, res) => {
  try {
    const { meetupsId } = req.params;
    const reviews = await getReviewList(meetupsId);

    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(500).send({ error: "Error retrieving meetups" });
  }
});

//Get one reviews
review.get("/:meetupsId/:reviewId", async (req, res) => {
  try {
    const { meetupsId, reviewId } = req.params;

    const review = await getReview(meetupsId, reviewId);

    return res.status(200).send(review);
  } catch (error) {
    return res.status(error.status).send({ error: error.message });
  }
});

module.exports = { review };
