
const mongoose = require('mongoose');
const User = require('./user'); 
// const UserSchema = User.schema;


//Chat Schema
const ChatSchema = new mongoose.Schema({
  senderObj: {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    userName: { type: String, required: true },
    mobile: { type: String, required: true }
  },
  receiverObj: {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
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


