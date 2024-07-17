const { model, Schema } = require('mongoose');

const equipmentLogSchema = new Schema(
    {
        equipmentId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Equipment',
        },
        adminId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ['maintenance', 'return', 'sell', 'buy'],
        },
        qty: {
            type: Number,
            required: false,
        },
    },
    { timestamps: true }
);

const EquipmentLog = model('EquipmentLog', equipmentLogSchema);
module.exports = EquipmentLog;
