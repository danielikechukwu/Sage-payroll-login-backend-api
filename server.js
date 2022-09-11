
// require('./config/db')
const connectDB = require('./config/db');

const bodyParser = require('express').json;

const express = require('express');

const app = express();

const UserRouter = require('./api/User');

const port = process.env.PORT || 8080;

//for accepting post form data require(id: string): any

connectDB();

app.use(bodyParser());

app.use(express({ extended: false}))

app.use('/user', UserRouter);

// app.get('/api/user')

//listening to port

app.listen(port, function() {

    console.log(`Server is ready at ${port}`)

})