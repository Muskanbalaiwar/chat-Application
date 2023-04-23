const express = require('express');

const adminController = require('../controllers/chat');
const authenticate=require('../middleware/auth')

const router = express.Router();

router.post('/chat',authenticate.author,adminController.addData)


module.exports=router;