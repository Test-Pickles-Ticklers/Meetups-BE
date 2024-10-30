const { User } = require("../Model/UserSchema");

const getParticipation = async (email) => {
  try {
    const user = User.findOne({ email: email }).populate("meetupParticipation");

    if (!user) return { success: false, error: "Could not find user" };

    return { data: user.meetupParticipation || [] };
  } catch (error) {
    throw error;
  }
};

module.exports = { getParticipation };
