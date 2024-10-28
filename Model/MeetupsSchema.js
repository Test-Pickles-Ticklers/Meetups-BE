const { mongoose } = require("../config");

const meetupsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        
    },
    organizer: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true  
    },
    time: {
        type: Date,
        required: true
    },
    location: { 
        type: String, 
        required: true
    },
    participants: {
        type: Array,
        required: false
    }
});

const Meetups = mongoose.model("Meetups", meetupsSchema);

module.exports = { Meetups };