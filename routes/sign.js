const express = require('express');

const adminController = require('../controllers/sign');

const router = express.Router();

router.post('/sign',adminController.postData)

module.exports=router;