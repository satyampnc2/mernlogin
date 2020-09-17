const express = require('express');
const router = express.Router();
const User  = require('../models/user');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');

router.post('/register',(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400).json({msg: 'information incomplete'})
        return;
    }
    User.findOne({email})
    .then(user => {
        if(user){
            res.status(400).json({msg:'Email already exist'});
            return;
        } else{
            const newUser = new User({
                name:name,
                email:email,
                password:password
            })
            bcrypt.genSalt(10,(err,salt)=>{
                if(err) throw err;
                bcrypt.hash(password,salt)
                .then(hash=>{
                    newUser.password = hash;
                    newUser.save()
                    .then(user=>{
                        res.json({
                            user:user
                        });
                    })
                })
                .catch(err=>{
                    res.status(400).send('error occured');
                })
            }
            )
    }
})
})


module.exports = router;