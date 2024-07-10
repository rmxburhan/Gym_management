const { model, Schema } = require('mongoose');

const employeeDetailSchema = new Schema(
    {
        employeeId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        bankAccountName: {
            type: String,
            required: true,
        },
        bankAccountNumber: {
            type: Number,
            required: true,
        },
        baseSalary: {
            type: Number,
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
            required: () => this.employeeType == 'staff',
        },
    },
    { timestamps: true }
);

const EmployeeDetail = model('EmployeeDetail', employeeDetailSchema);

module.exports = EmployeeDetail;
