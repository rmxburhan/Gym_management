const mongoose = require("mongoose");

const connect = async() => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database has been connected")
    })
    .catch(err => console.error(err))
}

module.exports = connect