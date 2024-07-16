const { model, Schema, SchemaType } = required('mongoose');

const memberDetailSchema = new Schema(
    {
        memberId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        weight: {
            type: Number,
            required: false,
        },
        height: {
            type: Number,
            required: false,
        },
        // percentage
        fat: {
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

const MemberDetail = model('MemberDetail', memberDetailSchema);
module.exports = MemberDetail;
