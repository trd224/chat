const express = require("express");
const router = express.Router();
const { chatHistory, uploadFile } = require("../controllers/chat");
const { authenticate } = require("../middlewares/auth");
const  upload  = require("../middlewares/multer");


router.get('/history/:sender/:receiver', authenticate, chatHistory);

router.post('/upload', upload.single('file'), uploadFile);



module.exports = router;
