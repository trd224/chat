const express = require("express");
const http = require('http');
const connectTOMongoDB = require("./connections/dbConnection");
const { initSocket } = require("./socket");
const cors = require("cors");
const path = require('path');
const app = express();
const server = http.createServer(app);
const { PORT, LOCAL_MONGODB, ORIGIN } = require('./configs/envConfig');

///////////////////

connectTOMongoDB(LOCAL_MONGODB)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

///////////////////

app.use('/file', express.static(path.join(__dirname, 'uploads/file')));
app.use(cors({
  origin: ORIGIN, 
  methods: ['GET', 'POST'], 
  credentials: true 
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

///////////////////

initSocket(server);

///////////////////

app.use("/api/user", require("./routers/user"));
app.use("/api/chat", require("./routers/chat"));

///////////////////

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
