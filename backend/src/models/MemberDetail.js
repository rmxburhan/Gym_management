const {model, Schema, SchemaType} = required("mongoose");

const memberDetailSchema = new Schema({
    memberId : {
        type : Schema.Types.ObjectId,
        required: true
    },
    weight : {
        type : Number,
        required : true,
    },
    height : {
        type : Number,
        required :true
    }
}, {timestamps: true})