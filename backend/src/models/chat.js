
const mongoose = require('mongoose');

//Chat Schema
const ChatSchema = new mongoose.Schema({
  senderObj: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    userName: { type: String, required: true },
    mobile: { type: String, required: true }
  },
  receiverObj: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    userName: { type: String, required: true },
    mobile: { type: String, required: true }
  },
  message: {type: String, required: true},
  fileName: {type: String},
  fileUrl: {type: String},
  fileType: {type: String},
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);


