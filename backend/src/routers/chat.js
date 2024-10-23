const express = require("express");
const router = express.Router();
const { chatHistory, uploadFile, downloadFile, openFile, createGroup, getAllGroup, getGroupByCurrentUserId } = require("../controllers/chat");
const { authenticate } = require("../middlewares/auth");
const  upload  = require("../middlewares/multer");


router.get('/history/:sender/:receiver', authenticate, chatHistory);
router.post('/upload', authenticate, upload.single('file'), uploadFile);
router.post('/download', authenticate, downloadFile);
router.post('/openFile', authenticate, openFile);
router.post('/createGroup', authenticate, createGroup);
router.get('/group/all', authenticate, getAllGroup);
router.get('/group/byCurrentUserId', authenticate, getGroupByCurrentUserId);






module.exports = router;
