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
            default: '',
        },
        deletedAt: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
);

const Equipment = model('Equipment', equipmentSchema);

module.exports = Equipment;
