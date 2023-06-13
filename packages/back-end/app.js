const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user.route');
const roleRoutes = require('./routes/roles.route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// Routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

app.listen(5001, () => {
    console.log('Server started on port 5001');
});

module.exports = app;
