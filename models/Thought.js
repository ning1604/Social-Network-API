const { Schema, model, Types } = require('mongoose');

// Imported moment package to format date
const moment = require('moment')

// Schema to create Reaction subdocument in `Thought` model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            requried: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Getter method to format timestamp
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYY [at] hh:mm a")
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Getter method to format timestamp
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYY [at] hh:mm a")
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

// Create a virtual property `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    });

// Initialize Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;