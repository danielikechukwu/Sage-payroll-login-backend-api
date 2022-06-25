
// require('./config/db')
const connectDB = require('./config/db');

const bodyParser = require('express').json;

const express = require('express');

const app = express();

const UserRouter = require('./api/User');

const Port = process.env.Port || 8080;

//for accepting post form data require(id: string): any

connectDB();

app.use(bodyParser());

app.use(express({ extended: false}))

app.use('/user', UserRouter);

// app.use('/api/userModel', require('./api/User'))

//listening to port

app.listen(Port, function() {
    console.log(`Server is ready at ${Port}`)
})