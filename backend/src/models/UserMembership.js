const { model, Schema, SchemaType } = require('mongoose');

const userMembershipSchema = new Schema(
    {
        memberId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        membershipId: {
            type: Schema.Types.ObjectId,
            ref: 'Membership',
            required: true,
        },
        registerDate: {
            type: Date,
            required: true,
        },
        expiresDate: {
            type: Date,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
            default: true,
        },
        // TODO : uncomment when you have a transaction table
        // payment : {
        //     type : Schema.Types.ObjectId,
        //     required : true
        // }
        deletedAt: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
);

const UserMembership = model('UserMembership', userMembershipSchema);

module.exports = userMembershipSchema;
