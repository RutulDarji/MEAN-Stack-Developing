const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
// router.get('/', (req, res, next) =>{
//     res.send('User Route Working Perfect');
// });

router.post('/register', (req, res, next) => {
    
    let newUser = new User( {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });
    
    User.addUser(newUser , (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Failed to Register'
            });
        } else {
            res.json({
                success: true,
                msg: 'User Registered'
            });
        }
    });

});


//authenticate router
/**
 * 1-> find the user by userid
 * 2-> if user exist then compare password
 * 3--> if all good then generate token else error
 */
router.post('/authenticate', (req, res,next) =>{
    //res.send('Authenticate');

    const username = req.body.username;
    const password = req.body.password;
    
    // find user by userid
    User.getUserByUsername(username, (err,user) => {
        if(err) throw err;

        if(!user) {
            return res.json({
                success: false,
                msg: "User not Found"
            });
        } 

        //compare password after user found
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            
            // if password match then generate token
            if(isMatch){
              const token = jwt.sign({data: user}, config.secret, {
                expiresIn: 604800 // 1 week
              });
              
              res.json({
                success: true,
                token: `Bearer ${token}`,
                user: {
                  id: user._id,
                  name: user.name,
                  username: user.username,
                  email: user.email
                }
              });
            } else {
              return res.json({success: false, msg: 'Wrong password'});
            }
          });
    });
});

//profile router
// so any route u want to protect make this 2nd param in it
router.get('/profile',  passport.authenticate('jwt', {session:false}),(req, res,next) =>{
    res.json({
        user: req.user
    });
});

router.get('/:id' ,(req, res, next) => {

    User.getUserById(req.params.id, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Failed to Get User'
            });
        } else {
            res.json({
                user : user,
                success: true,
                msg: 'Got User'
            });
        }
    });
});

// export router only then u can use this route
module.exports  = router;

