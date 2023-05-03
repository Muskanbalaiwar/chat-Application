const express = require('express');

const adminController = require('../controllers/chat');
const authenticate=require('../middleware/auth')

const router = express.Router();

router.post('/chat/post/:id',authenticate.author,adminController.addData)
router.get('/chat/get/:id',authenticate.author,adminController.getData)
router.post('/group/post',authenticate.author,adminController.createGroup)
router.get('/group/get',authenticate.author,adminController.getGroup)
router.get('/index/getGroupUser/:id',adminController.getGroupUsers)
router.post('/user/add/:id',authenticate.author,adminController.addUser)
router.delete('/group/delete/:id',adminController.deleteGroup)
router.post('/admin/create/:id',authenticate.author,adminController.createAdmin)
router.post('/admin/remove/:id',authenticate.author,adminController.removeAdmin)
router.post('/user/remove/:id',authenticate.author,adminController.removeUser)
router.get('/admin/find/:id',authenticate.author,adminController.findAdmin)


module.exports=router;