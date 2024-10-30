const { Review } = require("../Model/ReviewSchema");
const { Meetups } = require("../Model/MeetupsSchema");

const postReview = async (review) => {
  try {
    const meetup = await Meetups.findById(review.meetupsId);

    if (!meetup) {
      return res.status(404).send({ error: "Meetup not found" });
    }

    const newReview = new Review(review);

    await newReview.save();

    return newReview;
  } catch (error) {
    throw error;
  }
};

const getReviewList = async (meetupsId) => {
  try {
    const reviews = await Review.find({ meetupsId });
    return reviews;
  } catch (error) {
    throw error;
  }
};

const getReview = async (meetupdsId, reviewId) => {
  try {
    const review = await Review.findOne({ _id: reviewId, meetupdsId });

    if (!review) {
      const error = new Error("Review not found");
      error.status = 404;
      throw error;
    }

    return review;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  postReview,
  getReview,
  getReviewList,
};