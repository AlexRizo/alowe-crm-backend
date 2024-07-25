import { Schema, model } from "mongoose";

const PrintSchema = new Schema({
    printType: {
        type: String,
        required: true,
    },
    printSize: {
        type: Object,
        required: true,
    },
    printDescription: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    file: {
        type: String,
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
        default: "print",
    },
});

PrintSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

export default model("Print", PrintSchema);