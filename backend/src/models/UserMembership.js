const {model, Schema, SchemaType} = require("mongoose");

const userMembershipSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    registerTime : {
        type : Date,
        required : true
    },
    expiresTime : {
        type : Date, 
        required : true
    },
    membershipId : {
        type : Schema.Types.ObjectId,
        ref : "Membership",
        required : true
    },
    status : {
        type : Boolean,
        required :true,
        default : true
    }
})

const UserMembership = model("UserMembership", userMembershipSchema);

module.exports = userMembershipSchema