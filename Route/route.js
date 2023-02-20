const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')





router.get('/', userController.getUser)

router.get('/add', userController.add)

router.post('/add', userController.addUser);

router.get('/delete/:id', userController.deleteUser);

router.get('/edit/:id', userController.editUser);

router.post('/edit/:id', userController.editedUser);



module.exports = router;
