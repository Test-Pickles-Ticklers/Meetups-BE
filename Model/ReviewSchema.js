const { mongoose } = require("../config");

const reviewSchema = new mongoose.Schema({
  reviewId: { type: Schema.Types.ObjectId, ref: 'Meetups', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reviewer: { type: String, require: true},
  comment: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

const Review = mongoose.model('Review', reviewSchema);

module.exports = {Review};