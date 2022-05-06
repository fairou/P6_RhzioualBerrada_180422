const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJUT0tFTl9LRVkiLCJuYW1lIjoiRmFyaGF0aSBmYWlyb3V6IiwiaWF0IjoxNTE2MjM5MDIyfQ.fDPzEGjX0LN2ZemHhvqANH9tiIJSjTtdAYZKnXg5I7g');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};