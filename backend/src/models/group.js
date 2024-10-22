const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    groupMembers: {
        type: [String],
        required: true,
        default: []
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to user
    timestamp: { type: Date, default: Date.now }
});

GroupSchema.index({ groupName: 1, createdBy: 1 }, { unique: true }); // Unique group name per user

module.exports = mongoose.model('Group', GroupSchema);
