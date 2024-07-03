const {model, Schema} = require("mongoose");

const checkinSchema = new Schema({
    code : {
        type: String,
        required: true
    },
    expiresIn : {
        type : Date,
        required : true
    },
    createdFor : {
        type : Date,
        required : true
    }
    
});

const CheckIn = model("CheckIn", checkinSchema);

module.exports = CheckIn;