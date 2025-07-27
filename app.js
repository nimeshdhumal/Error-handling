const express = require('express');
const userRouter = require('./src/routes/userRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const app = express();
app.use(express.json());
app.use('/users', userRouter);
const PORT = 3000;

// Catch-all for 404 Not Found (if no route matches)
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error); // Pass the error to the error handling middleware
});

// Global Error Handling Middleware (must be the last middleware)
app.use(errorHandler);

app.listen(PORT,
    console.log(`Server is running on PORT:${PORT}`)
);