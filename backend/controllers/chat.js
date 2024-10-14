const Message = require("../models/message");

async function chatHistory(req, res){
    const { sender, receiver } = req.params;
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    }).sort('timestamp');
    res.json(messages);
}

async function uploadFile(req, res){
  console.log(req.file);
  const fileUrl = `http://localhost:4001/${req.file.filename}`;
  res.json({ fileUrl });
}

module.exports = { chatHistory, uploadFile }