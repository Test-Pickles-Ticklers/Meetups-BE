const { User } = require("../Model/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { dev_secret } = require("../config");
const { Meetups } = require("../Model/MeetupsSchema");

const getParticipation = async (email) => {
  try {
    const user = await User.findOne({ email: email })
      .populate("meetupParticipation")
      .exec();

    if (!user) return { success: false, error: "Could not find user" };
    const { meetupParticipation } = user;
    return meetupParticipation;
  } catch (error) {
    throw error;
  }
};

const registerUser = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.status = 404;
      throw error;
    }

    const token = jwt.sign({ email: user.email }, dev_secret, {
      expiresIn: "8h",
    });

    return token;
  } catch (error) {
    throw error;
  }
};

const getOwnMeetups = async (email) => {
  try {
    const meetups = await Meetups.find({ organizer: email });

    if (!meetups) return { success: false, error: "Could not find meetups" };

    return meetups;
  } catch (error) {
    throw error;
  }
};

module.exports = { getParticipation, registerUser, loginUser, getOwnMeetups };
