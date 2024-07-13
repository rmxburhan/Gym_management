const { model, Schema } = require('mongoose');

const employeeDetailSchema = new Schema(
    {
        employeeId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        employeeType: {
            type: String,
            enum: ['trainer', 'staff'],
        },
        status: {
            type: String,
            required: true,
            enum: ['active', 'resign'],
        },
        workSchedule: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const EmployeeDetail = model('EmployeeDetail', employeeDetailSchema);

module.exports = EmployeeDetail;
