const Chat = require("../models/chat");
const path = require('path');
const { DOMAIN } = require('../configs/envConfig');

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
  console.log(req.file);
  const fileName = req.file.filename;
  const fileUrl = `${DOMAIN}${req.file.filename}`;
  res.json({ fileName, fileUrl });
}

async function downloadFile(req, res){
  const filePath = path.join(__dirname, '..', 'uploads', path.basename(req.body.filePath)); // Extract filename from URL
    console.log('File path:', filePath);

    res.download(filePath, (err) => {
        if (err) {
            console.error('Error while downloading file:', err);
            res.status(500).send('Error downloading file');
        }
    });

  

}



module.exports = { chatHistory, uploadFile, downloadFile }