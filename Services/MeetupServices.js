const { Meetups } = require("../Model/MeetupsSchema");
const { User } = require("../Model/UserSchema");

const getMeetupList = async () => {
  try {
    const meetups = await Meetups.find().sort({ date: 1, time: 1 });

    return meetups;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const getMeetup = async (event) => {
  try {
    const meetup = await Meetups.findOne({ title: event });
    if (!meetup) {
      return { success: false };
    }

    return { success: true, data: meetup };
  } catch (error) {
    return { success: false, msg: error };
  }
};

const getMeetupById = async (id) => {
  try {
    const meetup = await Meetups.findById({ _id: id });
    if (!meetup) {
      return { success: false };
    }

    return { success: true, data: meetup };
  } catch (error) {
    return { success: false, msg: error };
  }
};

//might break here sometime
const addParticipants = async (email, eventId) => {
  try {
    const meetup = await Meetups.findByIdAndUpdate(
      { _id: eventId },
      { $push: { participants: email } },
      { new: true }
    );

    if (!meetup) return { success: false, msg: "Meetup not found" };

    const user = await User.findOneAndUpdate(
      { email: email },
      { $push: { meetupParticipation: eventId } },
      { new: true }
    );

    if (!user) return { success: false, msg: "User not found" };

    return { success: true, data: meetup };
  } catch (error) {
    return { success: false, msg: error };
  }
};

const cancelMeetupPartake = async (id, user) => {
  try {
    const participant = user;
    const meetup = await Meetups.findById(id);
    if (!meetup) {
      return { success: false, msg: "meetup not found" };
    }

    if (!meetup.participants.includes(participant)) {
      return {
        success: false,
        msg: "You are not a participant of this meetup",
      };
    }

    const updateMeetup = await Meetups.findByIdAndUpdate(
      id,
      { $pull: { participants: participant } },
      { new: true }
    );

    await User.findOneAndUpdate(
      { email: user },
      { $pull: { meetupParticipation: id } },
      { new: true }
    );

    return { success: true, data: updateMeetup };
  } catch (error) {
    return { success: false, msg: error.message };
  }
};

const addMeetup = async (newMeetup) => {
  try {
    const meetup = new Meetups(newMeetup);
    const isSuccess = await meetup.save();
    if (!isSuccess) {
      return { success: false, msg: "Could not add meetup" };
    }
    return { success: true, data: isSuccess };
  } catch (error) {
    return { success: false, msg: error };
  }
};

const deleteMeetup = async (id) => {
  try {
    const meetup = await Meetups.findByIdAndDelete(id);
    return true;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const updateMeetupById = async (id, updatedData) => {
  try {
    const updatedMeetup = await Meetups.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedMeetup) {
      return { success: false, msg: 'Meetup not found' };
    }

    return { success: true, data: updatedMeetup };
  } catch (error) {
    return { success: false, msg: error };
  }
};

module.exports = {
  getMeetup,
  addParticipants,
  addMeetup,
  getMeetupById,
  cancelMeetupPartake,
  deleteMeetup,
  updateMeetupById,
  getMeetupList,

};
