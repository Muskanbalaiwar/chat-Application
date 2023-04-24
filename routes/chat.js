const express = require('express');

const adminController = require('../controllers/chat');
const authenticate=require('../middleware/auth')

const router = express.Router();

router.post('/chat/post',authenticate.author,adminController.addData)
router.get('/chat/get',authenticate.author,adminController.getData)


module.exports=router;