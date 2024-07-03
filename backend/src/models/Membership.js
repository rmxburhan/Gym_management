const {model, Schema} = require("mongoose");

const membershipSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true,
        default : 30
    }
}, {timestamps: true})

const Membership = model("Membership", membershipSchema)

module.exports = Membership