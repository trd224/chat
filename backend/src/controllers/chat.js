const Chat = require("../models/chat");
const Group = require("../models/group");
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

async function createGroup(req, res) {
  try {
    const { groupName, groupMembers = [] } = req.body;
    const currentUserId = req.currentUserId; 

    // Check if the user already has a group with the same name
    const existingGroup = await Group.findOne({ groupName, createdBy: currentUserId });

    if (existingGroup) {
      return res.status(409).json({ message: "Group with the same name already exists for this user." });
    }

    // Add the current user as a default member of the group
    if (!groupMembers.includes(currentUserId)) {
      groupMembers.push(currentUserId); // Ensure current user is added to groupMembers
    }

    // Create a new group
    const newGroup = new Group({
      groupName,
      groupMembers,
      createdBy: currentUserId
    });

    await newGroup.save();
    return res.status(201).json({ message: "Group created successfully!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function getAllGroup(req, res) {
  try {
    const groups = await Group.find({});
    if(groups){
      return  res.status(200).send(groups);
    }
  }
  catch(err){
    return res.status(500).json({ error: err.message });
  }
}




module.exports = { chatHistory, uploadFile, downloadFile, openFile, createGroup, getAllGroup };
