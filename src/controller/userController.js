const { validationResult } = require('express-validator');

exports.createUser = (req, res, next) => {
    // Check for validation errors from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are validation errors, we create a custom error object
        const validationError = new Error('Validation Failed');
        validationError.status = 400;
        validationError.errors = errors.array(); //Attach the validation errors
        return next(validationError); //Pass to our handling middleware
    }

    // If validation passes, proceed with creating the user
    const { name, email } = req.body;
    // In a real application, you would save this to a database
    console.log(`Creating user: Name - ${name}, Email - ${email}`);

    res.status(201).json({
        success: true,
        message: 'User created successfully!',
        user: { name, email }
    });
};

exports.getUsers = (req, res, next) => {
    try {
        // Simulate a database error for demonstration
        // throw new Error('Failed to fetch users from database!');
        const users = [
            { id: 1, name: 'Alice', email: 'alice@example.com' },
            { id: 2, name: 'Bob', email: 'bob@example.com' }
        ];
        res.status(200).json({ success: true, users });
    } catch (error) {
        // If an error occurs, pass it to the error handling middleware
        next(error);
    }
};

exports.getSpecificUser = (req, res, next) => {
    const userId = req.params.id;
    if (userId === 'error') {
        const customError = new Error('User not found!');
        customError.status = 404;
        return next(customError);
    }
    res.status(200).json({ success: true, message: `Details for user ${userId}` });
};