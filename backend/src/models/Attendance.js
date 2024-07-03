const { model, Schema } = require('mongoose');

const attendanceSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        checkInTime: {
            type: Date,
            required: true,
        },
        checkOutTime: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
);

const Attendance = model('Attendance', attendanceSchema);
module.exports = Attendance;
