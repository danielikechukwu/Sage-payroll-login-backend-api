
//Mongoose are normally used for connecting the backend to the database MONGODB

const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const mongoose = require('mongoose');

const URL = process.env.DATABASE_URL;

const connectDB  = async() => {

 await mongoose.connect(URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      });

      console.log("Database connected..!!");

    };

module.exports = connectDB;

      
