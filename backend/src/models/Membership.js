const { model, Schema } = require('mongoose');

const membershipSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
            default: 30,
        },
        price: {
            type: Number,
            required: true,
        },
        published: {
            type: Boolean,
            required: true,
            default: false,
        },
        discountPrice: {
            type: Number,
            required: false,
        },
        deletedAt: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

const Membership = model('Membership', membershipSchema);

module.exports = Membership;
