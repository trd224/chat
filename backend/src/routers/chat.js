const express = require("express");
const router = express.Router();
const { chatHistory, groupChatHistory, uploadFile, downloadFile, openFile, createGroup, exitGroup, getAllGroup, getGroupById, getGroupByCurrentUserId } = require("../controllers/chat");
const { authenticate } = require("../middlewares/auth");
const  upload  = require("../middlewares/multer");


router.get('/history/:sender/:receiver', authenticate, chatHistory);
router.get('/groupHistory/:groupId', authenticate, groupChatHistory);
router.post('/upload', authenticate, upload.single('file'), uploadFile);
router.post('/download', authenticate, downloadFile);
router.post('/openFile', authenticate, openFile);
router.post('/createGroup', authenticate, createGroup);
router.post('/exitGroup', authenticate, exitGroup);
router.get('/group/all', authenticate, getAllGroup);
router.get('/group/:id', authenticate, getGroupById);
router.get('/group/currentUser/byCurrentUserId', authenticate, getGroupByCurrentUserId);







module.exports = router;
