const express = require('express');

const adminController = require('../controllers/chat');
const authenticate=require('../middleware/auth')

const router = express.Router();

router.post('/chat/post/:id',authenticate.author,adminController.addData)
router.get('/chat/get/:id',authenticate.author,adminController.getData)
router.post('/group/post',adminController.createGroup)
router.get('/group/get',authenticate.author,adminController.getGroup)

router.post('/user/add/:id',adminController.addUser)


module.exports=router;