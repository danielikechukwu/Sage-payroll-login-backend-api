//Express will be used for the API calling 

const express = require('express');

// const mongoose = require('mongoose');

const router = express.Router();

//Get access to user mongo model
const User = require('./../models/User');

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");





//Signup
router.post('/signup',  (req, res) => {

         //let{ name, email, password, dateOfBirth} = req.body;
         let { username, password, fullname, residentId, phone, maritalStatus, gender, apartmentType, apartmentInfo, dateOfBirth, houseAddress, zone} = req.body;

         let user = {};

         user.username = username.trim();
         user.password = password.trim();
         user.fullname = fullname.trim();
         user.residentId = residentId.trim();
         user.phone = phone.trim();
         user.maritalStatus = maritalStatus.trim();
         user.gender = gender.trim();
         user.apartmentType = apartmentType.trim();
         user.apartmentInfo = apartmentInfo.trim();
         user.dateOfBirth = dateOfBirth.trim();
         user.houseAddress = houseAddress.trim();
         user.zone = zone.trim();


         const generateToken = (user) => {

            return jwt.sign(
                {
                    _id: user._id, email: user.email,
                }, 
                "SUPERSECRET123"
            )
        }        


         if(  username== "" || password=="" || fullname == "", residentId=="" || phone=="" || maritalStatus=="" || gender=="" || apartmentType=="" || apartmentInfo =="" || dateOfBirth=="" || houseAddress=="" || zone==""){

            res.json({
                status: "FAILED",
                message: "Empty input fields"
            });
         }
         
        else if(!new Date(dateOfBirth).getTime()) {

            res.json({
                    status: "FAILED",
                    message: "Invalid date entered"
                })
        }
        
        else if(password.length < 8 ){
            res.json({
                status: "FAILED",
                message: "Password is too short!!!"
            })
        }

        else{

            User.find({username}).then(result => {

                if(result.length) {
                    res.json({
                        status: "FAILED",
                        message: "User with the provided email already exists"
                    })
                }
                else {

                    //Hashing of password
                    const sandRounds = 10;

                    bcrypt.hash(password, sandRounds).then(hashedPassword => {

                        const newUser = new User({

                            username,
                            password: hashedPassword,
                            fullname,
                            residentId,
                            phone,
                            maritalStatus,
                            gender,
                            apartmentType,
                            apartmentInfo,
                            dateOfBirth,
                            houseAddress,
                            zone

                        });

                        

                        newUser.save().then(result => {

                            const token = generateToken(user)

                            res.json({
                                status: "SUCCE",
                                message: "Signup successful",
                                data: result,
                                token: token,
                                

                            })
                        }).catch(err => {
                            res.json({
                                status: "FAILED",
                                message: "An error occurred while saving account"
                            })
                        })

                    }).catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An error occurred while hashing the password"

                        })
                    })

                }

            }).catch(err => {
                console.log(err);
                res.json({
                    status: "FAILED",
                    message: "An error occurred while checking for existing user"
                })
            })

        }

})

//Login
router.post('/login', (req, res) => {
    
    let { username, password} = req.body;

    let user = {};

    user.username = username.trim();

    user.password = password.trim();

     
    const generateToken = (user) => {

        return jwt.sign(
            {
                _id: user._id, email: user.email,
            }, 
            "SUPERSECRET123"
        )
    }  


    const token = generateToken(user)

    if(username == "" || password == ""){

        res.json({

            status: "FAILED",
            message: "Empty credentials supplied"

        })
    }
    
    else{

        

        User.find({username}).then(data => {

            if(data.length){

                //User exist
                const hashedPassword = data[0].password;

                bcrypt.compare(password, hashedPassword).then(result => {

                    if(result){
                        //Password match
                        res.json({
                            status: "SUCCESS",
                            message: "Sign-in successful",
                            data: data,
                            token: token,
                        })
                    }
                    else{

                        res.json({
                            status: "FAILED",
                            message: "Invalid password entered"
                        })

                    }
                }).catch(err => {

                    res.json({
                        status: "FAILED",
                        message: "An error occurred while comparing password"
                    })
                })
            }
            else {
                
                res.json({
                    status: "FAILED",
                    message: "Invalid credentials entered"
                })
            }
        }).catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occured while checking for existing users"
            })            
        })
    }

})

module.exports = router;