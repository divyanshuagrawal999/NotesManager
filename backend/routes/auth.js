// const { default: userEvent } = require("@testing-library/user-event");
const express = require("express");

const router = express.Router();

const User = require('../models/User');

const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var fetchUser = require('../middlewares/fetchUser')

const JWT_SECRET = 'divisagoodboy';


//ROUTE 1: create a user using Post "/api/auth/createuser"  doesn't require auth    NO LOGIN REQUIRED
// router.get('/', (req,res)=>{
//     router.post('/', (req,res)=>{
//     console.log(req.body);
//     // res.send("hello");

//     const user = User(req.body);
//     user.save();
//     res.send(req.body);
// })

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({
        min: 3
        // max:30,
    }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter a valid pswd').isLength({ min: 5 }),

], async (req, res) => {
    // console.log(req.body); 
    // res.send("hello");
    let success = false;
    //if there are errors, return bad req and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    //check whether the user with this email exist already
    try {

        let user = await User.findOne({ email: req.body.email });
        console.log(user)
        if (user) {
            return res.status(400).json({ success, error: "sorry user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        securedPass = await bcrypt.hash(req.body.password,salt);

        // create a new user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            // password: req.body.password,
            password:securedPass,   //generating a hashed password
        })
        //  User.create({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password,
        //   })
        //   .then(user => res.json(user)).catch(err=>{console.log(err)
        //   res.json({error: "please enter a unique value for email", "message":err.message})})

        //sending res to console
        // res.send(req.body);

        //payload
        const data = {
            user:{
                id: user.id
            }
        }
        
        // const jwtData = jwt.sign(data, JWT_SECRET);
        const authtoken = jwt.sign(data, JWT_SECRET)

        // console.log(jwtData);

        // res.json(user);
        let success = true;
        res.json({success, authtoken:authtoken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }
})


//ROUTE 2: Authenticate a user using : POST '/api/auth/login' no login required
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
],async(req,res)=>{

    //if there are errors return bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.statis(400).json({erros: errors.array()});
    }
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "please try to login with correct credentials"}); //sorry user does not exist
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success, error: "please try again with correct credentials"})

        }

        //payload
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authtoken});

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 3: Get login id user details using: POST "/api/auth/getUser", Login required

    router.post('/getuser',fetchUser, async(req,res)=>{          //a fetchuser middleware is provided after it run async funciton wil run
        try {
            userId = req.user.id;
            const user = await User.findById(userId).select("-password")  //i can select all the feild using dot select except the password by "-password"
            res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error");
        }
    })


module.exports = router