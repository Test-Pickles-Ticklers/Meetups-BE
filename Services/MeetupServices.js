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



module.exports = { getMeetup, addParticipants }