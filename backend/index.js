const express = require("express");
const http = require('http');
const connectTOMongoDB = require("./connection/dbConnection");
const { initSocket } = require("./socket");
const cors = require("cors");
const path = require('path');
const app = express();
const server = http.createServer(app);

const PORT = 4001;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'uploads')));

connectTOMongoDB("mongodb://127.0.0.1:27017/fullstackTest")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

app.use(cors({
  origin: 'http://localhost:4300', // Allow requests from this origin
  methods: ['GET', 'POST'], // Specify the allowed methods
  credentials: true // Allow credentials (if needed)
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

initSocket(server);

app.use("/api/user", require("./routers/user"));
app.use("/api/chat", require("./routers/chat"));

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
