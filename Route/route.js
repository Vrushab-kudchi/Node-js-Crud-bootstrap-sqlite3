const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router.get('/', userController.getUser)

router.get('/add', userController.add)



module.exports = router;
