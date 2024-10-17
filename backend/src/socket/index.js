const Chat = require("../models/chat");
const socketIo = require('socket.io');
const { ORIGIN } = require('../configs/envConfig');

let io;
const connectedUsers = new Map(); // Map to track socket.id to user.email




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

      // Listen for user details to associate socket with the email
      socket.on('register', (email) => {
        connectedUsers.set(email, socket.id);
        console.log(`${email} is connected with socket id ${socket.id}`);
      });

       // Listen for "typing" event
       socket.on('typing', (data) => {
        const { sender, receiver } = data;
        const receiverSocketId = connectedUsers.get(receiver);

        if (receiverSocketId) {
          io.to(receiverSocketId).emit('typing', { sender });
        }
      });
    
      // Listen for new chat messages
      socket.on('private message', async (data) => {
        const { sender, receiver, message } = data;

        // Store the message in MongoDB
        const newChat = new Chat({ sender, receiver, message });
        await newChat.save();

        const receiverSocketId = connectedUsers.get(receiver);

        
        // Emit message to the sender and receiver if the receiver is connected
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('private message', { sender, receiver, message }); // Send to receiver
        }
        socket.emit('private message', { sender, receiver, message }); // Send to sender
      });



      // Handle photo/file sending
      socket.on('file upload', async (data) => {
        const { sender, receiver, fileName, fileUrl, fileType } = data;

        // Store the file metadata (e.g., fileUrl, fileType) in MongoDB
        const newChat = new Chat({ sender, receiver, message: `${fileType} uploaded`, fileName, fileUrl, fileType });
        await newChat.save();

        const receiverSocketId = connectedUsers.get(receiver);

        // Emit file to the sender and receiver
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('file upload', { sender, receiver, fileName, fileUrl, fileType });
        }
        socket.emit('file upload', { sender, receiver, fileName, fileUrl, fileType });
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
