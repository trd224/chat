
const mongoose = require('mongoose');

//Chat Schema
const GroupChatSchema = new mongoose.Schema({
  senderObj: {
    _id: { type: String },
    name: { type: String },
    userName: { type: String },
    mobile: { type: String }
  },
  groupObj: {
    _id: { type: String },
    groupName: { type: String },
    groupMembers: {
        type: [String]
    },
    createdBy: { type: String }, 
  },
  message: {type: String, required: true},
  fileName: {type: String},
  fileUrl: {type: String},
  fileType: {type: String},
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GroupChat', GroupChatSchema);


