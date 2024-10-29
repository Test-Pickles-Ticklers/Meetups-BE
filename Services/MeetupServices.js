const { user } = require("../Controllers/UserController")
const { Meetups } = require("../Model/MeetupsSchema")

const getMeetup = async (event) => {
    try {
        const meetup = await Meetups.findOne({title: event})
        if(!meetup){
            return {success: false}
        }

        return {success: true, data: meetup}
    } catch (error) {
        return {success: false, msg: error}
    }
}

const getMeetupById = async (id) => {
    try {
        const meetup = await Meetups.findById({_id: id})
        if(!meetup){
            return {success: false}
        }

        return {success: true, data: meetup}
    } catch (error) {
        return {success: false, msg: error}
    }
}

//might break here sometime
const addParticipants = async (email, eventId) => {
    try {
        const meetup = await Meetups.findByIdAndUpdate(
            {_id: eventId}, 
            {$push: { participants: email}},
            {new: true}
        )

        if(!meetup){
            return {success: false, msg: "Meetup not found"}
        }

        return { success: true, data: meetup}
    } catch (error) {
        return { success: false, msg: error}
    }
}

const cancelMeetupPartake = async (id, user) => {
    try {
        console.log("ID IN CANCEL", id)
        console.log("USER IN CANCEL", user)
        const participant = user
        const meetup = await Meetups.findById(id)
        console.log("MEETUP IN CANCEL", meetup)
        if(!meetup){
            return {success: false, msg: "meetup not found"}
        }

        if(!meetup.participants.includes(participant)){
            return {success: false, msg: "You are not a participant of this meetup"}
        }

        const updateMeetup = await Meetups.findByIdAndUpdate(id,
            {$pull: {participants: participant} },
            {new: true}
    );

    return { success: true, data: updateMeetup}

    } catch(error){
        return { success: false, msg: error.message}
    } 
}

const addMeetup = async (title, organizer, date, time, location) => {
    try {
        const meetup = new Meetups({
            title,
            organizer,
            date,
            time,
            location,
        });
        const isSuccess = await meetup.save()
        if(!isSuccess){
            return {success: false, msg: "Could not add meetup"}
        }
        console.log(isSuccess)
        return{ success: true, data: isSuccess}
    } catch (error) {
        return { success: false, msg: error}
    }
}




module.exports = { getMeetup, addParticipants, addMeetup, getMeetupById, cancelMeetupPartake }