const express = require('express');

const adminController = require('../controllers/sign');

const router = express.Router();

router.post('/sign',adminController.postData)
router.post('/login',adminController.login)

module.exports=router;