const { model, Schema } = require('mongoose');

const equipmentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
            default: 0,
        },
        image: {
            type: String,
            required: false,
        },
        deletedAt: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
);

equipmentSchema.virtual('equipmentLogs', {
    ref: 'EquipmentLog',
    localField: '_id',
    foreignField: 'equipmentId',
});

const Equipment = model('Equipment', equipmentSchema);

module.exports = Equipment;
