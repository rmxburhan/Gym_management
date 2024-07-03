const { model, Schema } = require('mongoose');

const attendanceCodeSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
        },
        expiresIn: {
            type: Date,
            required: true,
        },
        createdIn: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

const AttendanceCode = model('AttendanceCode', attendanceCodeSchema);

module.exports = AttendanceCode;
