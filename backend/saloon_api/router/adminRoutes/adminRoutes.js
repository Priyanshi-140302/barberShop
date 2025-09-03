const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController/adminController');

router.post('/register',adminController.registerUser);
router.post('/login',adminController.userLogin);
// router.post('/add-user',UserController.addUser);
// router.get('/get',UserController.getAllUsers);
// router.get('/get/:id',UserController.getAllUsersById);
// router.put('/update/:id',UserController.updateUser);
// router.delete('/delete/:id',UserController.deleteUser);
// router.post('/forgot-password',UserController.forgotPassword);
// router.post('/reset-password',UserController.resetPassword);

module.exports = router;