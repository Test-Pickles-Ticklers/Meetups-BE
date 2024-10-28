const { express, mongoose } = require("../config");
const { Meetups } = require("../Model/MeetupsSchema");


const meetup = express.Router();

meetup.use(express.json());

meetup.get("/meetups", async (req, res) => {
    try {
        const meetups = await Meetups.find({})
        return res.status(200).json(meetups)
    } catch (error) {
        return res.status(500).json({ msg: "Error retrieving meetups"})
    }
})

.post("/signup", async (req, res) => {
    //token
    try {
        const user = req.user;

    } catch (error) {
        
    }
})

.post("/")