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

const addParticipants = async (email, event) => {
    try {
        const meetup = await Meetups.findOneAndUpdate(
            {title: event}, 
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



module.exports = { getMeetup, addParticipants, addMeetup, getMeetupById }