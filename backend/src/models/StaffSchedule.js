const { model, Schema } = require('mongoose');

const staffScheduleSchema = new Schema(
    {
        staffId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        timeStart: {
            type: Number,
            required: true,
        },
        timeEnd: {
            type: Number,
            required: true,
        },
        day: {
            type: [Number],
            default: [],
        },
        deletedAt: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
);

const StaffSchedule = model('StaffSchedule', staffScheduleSchema);

module.exports = StaffSchedule;
