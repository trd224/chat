const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
  fileName: String,
  fileUrl: String,
  fileType: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);


