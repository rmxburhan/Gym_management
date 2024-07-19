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

attendanceSchema.virtual('memberDetail', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
});

const Attendance = model('Attendance', attendanceSchema);
module.exports = Attendance;
