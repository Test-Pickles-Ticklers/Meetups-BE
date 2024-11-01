const { mongoose } = require('../config');

const reviewSchema = new mongoose.Schema(
  {
    meetupsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meetups',
      required: true,
    },
    reviewer: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review };
