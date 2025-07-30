const express = require('express');
const { body } = require('express-validator');
const userController = require('../controller/userController');
const router = express.Router();

const validation = [
    // express-validator middleware for validation
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 character long'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
];

router.post('/', validation, userController.createUser);

// Route for getting all users
router.get('/', userController.getUsers);

// Route for getting a specific user
router.get('/:id', userController.getSpecificUser);

module.exports = router;