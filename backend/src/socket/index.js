const Chat = require("../models/chat");
const User = require("../models/user");
const Group = require("../models/group");
const GroupChat = require("../models/groupChat");
const socketIo = require('socket.io');
const { ORIGIN } = require('../configs/envConfig');

let io;
const connectedUsers = new Map(); // Map to track socket.id to user.userName




const initSocket = async (server) => {
  io = socketIo(server, {
    cors: {
      origin: ORIGIN, // Adjust according to your frontend URL
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  try {
    // Socket.IO
    io.on('connection', (socket) => {
      console.log('User connected: ' + socket.id);

      // Listen for user details to associate socket with the userName
      socket.on('register', (userId) => {
        connectedUsers.set(userId, socket.id);
        console.log(`${userId} is connected with socket id ${socket.id}`);
      });

       // Listen for "typing" event
       socket.on('typing', async (data) => {
        const { sender, receiver } = data;
        const senderObj = await User.findById(sender).select('_id name userName mobile').lean();
        const receiverSocketId = connectedUsers.get(receiver);

        if (receiverSocketId) {
          io.to(receiverSocketId).emit('typing', { senderObj });
        }
      });
    
      // Listen for new chat messages
      socket.on('private message', async (data) => {
        const { sender, receiver, message } = data;

        // Fetch sender and receiver details
        const senderObj = await User.findById(sender).select('_id name userName mobile').lean();
        const receiverObj = await User.findById(receiver).select('_id name userName mobile').lean();

        // Check if both users exist
        if (!senderObj || !receiverObj) {
          console.error('User not found');
          return;
        }

        // Create the chat object with full user details
        const newChat = new Chat({
          senderObj,
          receiverObj,
          message
        });

        // Save the chat to MongoDB
        await newChat.save();

        const receiverSocketId = connectedUsers.get(receiver);

        
        // Emit message to the sender and receiver if the receiver is connected
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('private message', { senderObj, receiverObj, message }); // Send to receiver
        }
        socket.emit('private message', { senderObj, receiverObj, message }); // Send to sender
      });


       // Listen for a user joining a group
        socket.on('joinRoom', async (groupId) => {
          const group = await Group.findById(groupId);
          if (!group) {
            console.error('Group not found');
            return;
          }

          socket.join(groupId); // Add the user to the group room
          console.log(`User ${socket.id} joined group: ${group.groupName}`);
        });

       // Listen for the 'leave-group' event
        socket.on('leaveRoom', async (groupId) => {
          const group = await Group.findById(groupId);
          if (!group) {
            console.error('Group not found');
            return;
          }

          socket.leave(groupId); // Remove the user from the group room
          console.log(`User ${socket.id} left group: ${group.groupName}`);
        });


      socket.on('group message', async (data) => {
        const { sender, groupId, message } = data;

        const senderObj = await User.findById(sender).select('_id name userName mobile').lean();
        const groupObj = await Group.findById(groupId);

        if (!senderObj || !groupObj) {
          console.error('User or Group not found');
          return;
        }

        // Create chat object for group message
        const newGroupChat = new GroupChat({
          senderObj,
          groupObj,
          message,
          //isGroupMessage: true // Optional field to differentiate group and private messages
        });

        // // Save group message to MongoDB
        await newGroupChat.save();

        // Broadcast message to all users in the group room, including the sender
        io.to(groupId).emit('group message', { senderObj, groupObj, message });


      })



      // Handle photo/file sending
      socket.on('file upload', async (data) => {
        const { sender, receiver, fileName, fileUrl, fileType } = data;

        // Fetch sender and receiver details
        const senderObj = await User.findById(sender).select('_id name userName mobile').lean();
        const receiverObj = await User.findById(receiver).select('_id name userName mobile').lean();

        // Store the file metadata (e.g., fileUrl, fileType) in MongoDB
        const newChat = new Chat({ 
          senderObj, 
          receiverObj, 
          message: `${fileType} uploaded`, 
          fileName, 
          fileUrl, 
          fileType 
        });
        await newChat.save();

        const receiverSocketId = connectedUsers.get(receiver);

        // Emit file to the sender and receiver
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('file upload', { senderObj, receiverObj, fileName, fileUrl, fileType });
        }
        socket.emit('file upload', { senderObj, receiverObj, fileName, fileUrl, fileType });
      });

      socket.on('file upload on group', async (data) => {
        const { sender, groupId, fileName, fileUrl, fileType } = data;

        // Fetch sender and receiver details
        const senderObj = await User.findById(sender).select('_id name userName mobile').lean();
        const groupObj = await Group.findById(groupId);

        // Store the file metadata (e.g., fileUrl, fileType) in MongoDB
        const newGroupChat = new GroupChat({ 
          senderObj, 
          groupObj, 
          message: `${fileType} uploaded`, 
          fileName, 
          fileUrl, 
          fileType 
        });
        await newGroupChat.save();

        // Emit file to the sender and group
       
        io.to(groupId).emit('file upload on group', { senderObj, groupObj, fileName, fileUrl, fileType });
        
        //socket.emit('file upload', { senderObj, receiverObj, fileName, fileUrl, fileType });
      });


    
      // Handle user disconnect
      socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
        // Remove the user from the connected users map
        connectedUsers.forEach((value, key) => {
          if (value === socket.id) {
            connectedUsers.delete(key);
            console.log(`User ${key} disconnected and removed from the map`);
          }
        });
      });
    });
  } catch (err) {
    console.error(err);
  }
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = { initSocket, getIo };
