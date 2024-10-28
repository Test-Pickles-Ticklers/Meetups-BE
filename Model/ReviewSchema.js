const { mongoose } = require("../config");

const reviewSchema = new mongoose.Schema({
  // reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Meetups', required: true },
  email: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewer: { type: String, required: true},
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

const Review = mongoose.model('Review', reviewSchema);

module.exports = {Review};