
const mongoose = require('mongoose');

//Chat Schema
const GroupChatSchema = new mongoose.Schema({
  senderObj: {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    userName: { type: String, required: true },
    mobile: { type: String, required: true }
  },
  groupObj: {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    groupName: { type: String, required: true },
    groupMembers: {
        type: [String],
        required: true,
        default: []
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  },
  message: {type: String, required: true},
  fileName: {type: String},
  fileUrl: {type: String},
  fileType: {type: String},
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GroupChat', GroupChatSchema);


