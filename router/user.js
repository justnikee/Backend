const express = require('express');
const router = express.Router();
const userController = require('../controller/user')

router
.post('/register', userController.registerUser)
.post('/',   userController.createUser)  // Resister user
.get('/',   userController.getAllUsers)
.get('/:id',   userController.getUsers)
.put('/:id',  userController.replaceUsers)
.patch('/:id',  userController.updateUsers)
.delete('/:id',  userController.deleteUsers)

exports.router = router;