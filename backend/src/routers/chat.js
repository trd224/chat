const express = require("express");
const router = express.Router();
const { chatHistory, uploadFile, downloadFile, openFile } = require("../controllers/chat");
const { authenticate } = require("../middlewares/auth");
const  upload  = require("../middlewares/multer");


router.get('/history/:sender/:receiver', authenticate, chatHistory);
router.post('/upload', authenticate, upload.single('file'), uploadFile);
router.post('/download', authenticate, downloadFile);
router.post('/openFile', authenticate, openFile);



module.exports = router;
