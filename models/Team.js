import { Schema, model } from "mongoose";

const TeamSchema = Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#9ABAE1'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

TeamSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

export default model('Team', TeamSchema);