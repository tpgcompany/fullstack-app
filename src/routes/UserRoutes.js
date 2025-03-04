const express = require("express");
const UserController = require('../controllers/UserController');

const router = express.Router();

router
  .post('/register', UserController.registerUser)
  .post('/login', UserController.loginUser)
  .get('/profile', UserController.profileUser);

module.exports = router;