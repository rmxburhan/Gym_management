const { model, Schema } = require('mongoose');

const staffAttendanceSchema = new Schema(
    {
        staffId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        checkInTime: {
            type: Number,
            required: true,
        },
        lateTime: {
            type: Number,
            required: true,
        },
        checkOutTime: {
            type: Number,
            required: false,
        },
        deletedAt: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
);

const StaffAttendance = model('StaffAtten)dance', staffAttendanceSchema);
module.exports = StaffAttendance;
