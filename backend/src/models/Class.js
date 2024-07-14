const { model, Schema } = require('mongoose');

const classSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        trainerId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        date: {
            type: Date,
            required: true,
        },
        maxParticipant: {
            type: Number,
            required: true,
        },
        deletedAt: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
);

const Class = model('Class', classSchema);

module.exports = Class;