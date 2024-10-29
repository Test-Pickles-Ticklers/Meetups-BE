const { mongoose } = require("../config");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = {User};