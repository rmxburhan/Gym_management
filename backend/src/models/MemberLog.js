const {model, Schema} = require("mongoose");

const memberVisitLog = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    dateTime : {
        type : Date,
        required : true
    }
})

const MemberLog = model("MemberLog", memberVisitLog)

module.exports = MemberLog