const Chat = require("../models/chat");
const path = require("path");
const { exec, spawn } = require("child_process");

async function chatHistory(req, res) {
  const { sender, receiver } = req.params;
  const messages = await Chat.find({
    $or: [
      { "senderObj._id": sender, "receiverObj._id": receiver },
      { "senderObj._id": receiver, "receiverObj._id": sender },
    ],
  }).sort("timestamp");
  res.json(messages);
}

async function uploadFile(req, res) {
  const fileName = req.file.filename;
  const fileUrl = `${req.file.filename}`;
  res.json({ fileName, fileUrl });
}

async function downloadFile(req, res) {
  const filePath = path.join(__dirname, '../../', 'uploads/file', path.basename(req.body.filePath)); // Extract filename from URL
  //const filePath = path.join(__dirname, "../../", "uploads/file", "1729246887935-575421045-Loom Setup 0.249.0.zip");

  res.download(filePath, (err) => {
    if (err) {
      console.error("Error while downloading file:", err);
      res.status(500).send("Error downloading file");
    }
  });
}

async function openFile(req, res) {
  const fPath = req.body.filePath;
  const filePath = path.join(__dirname, "../../", "uploads/file", fPath); // Path to your file

  // Command to open the file
  exec(`start "" "${filePath}"`, (error) => {
    if (error) {
      console.error(`Error opening file: ${error.message}`);
      return res.status(500).send("Failed to open file");
    }

    res.send("File opened successfully");
  });
}

module.exports = { chatHistory, uploadFile, downloadFile, openFile };
