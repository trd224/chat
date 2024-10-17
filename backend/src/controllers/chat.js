const Chat = require("../models/chat");
const path = require('path');

async function chatHistory(req, res){
    const { sender, receiver } = req.params;
    const messages = await Chat.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    }).sort('timestamp');
    res.json(messages);
}

async function uploadFile(req, res){
  const fileName = req.file.filename;
  const fileUrl = `${req.file.filename}`;
  res.json({ fileName, fileUrl });
}

async function downloadFile(req, res){
  const filePath = path.join(__dirname, '../../', 'uploads/file', path.basename(req.body.filePath)); // Extract filename from URL

    res.download(filePath, (err) => {
        if (err) {
            console.error('Error while downloading file:', err);
            res.status(500).send('Error downloading file');
        }
    });

  

}



module.exports = { chatHistory, uploadFile, downloadFile }