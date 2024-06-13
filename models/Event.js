import { Schema, model } from "mongoose";

const EventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    requiriments: {
        type: [String],
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        required: true,
        default: "event",
    },
});

EventSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

export default model("Event", EventSchema);