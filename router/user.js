const express = require('express');
const router = express.Router();
const userController = require('../controller/user')
const {requireSignIn, isAdmin} = require('../middleware/authMiddleware')


router.use('/test', [requireSignIn, isAdmin]);

router
.post('/register', userController.registerUser)
.post('/',   userController.createUser)
.post('/login', userController.userLogin)
.get('/',   userController.getAllUsers)
.get('/:id',   userController.getUsers)
.put('/:id',  userController.replaceUsers)
.patch('/:id',  userController.updateUsers)
.delete('/:id',  userController.deleteUsers)
.get('/test', userController.testUser)

exports.router = router;